var express = require('express');
var router = express.Router();
var empresas = require('../models/empresas');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer  =require('../libs/multer');
var path = require('path');
var fs = require('fs-extra');

//Login 
    router.post('/signin', async (req, res) => {
        const correo = req.body.correo;
        const password = req.body.contrasenia;
        const company = await empresas.findOne({'correoEmpresa':correo});

        if(!company){
            return res.status(401).json({'message':'No se encontró ninguna empresa registrada con ese correo electrónico'});
        }

        if(!bcrypt.compareSync(password, company.contraseniaEmpresa)){
            return res.status(401).json({'message':'Contraseña incorrecta'});
        }

        const token = jwt.sign({_id: company._id}, 'secretkey');
        return res.status(200).json({token, 'idBrand':company._id});
    })

// ----------------- //


//Create brand
    router.post('/signup', async (req, res) => {
        const salt = 10;
        const hash =  await bcrypt.hashSync(req.body.contraseniaEmpresa, salt);
        const email = await empresas.findOne({'correoEmpresa':req.body.correoEmpresa});

        if(email){
            return res.status(401).json({'message':'El correo electrónico ingresado ya está registrado'});
        }
        
        let brand = new empresas(
            {
                nombreEmpresa : req.body.nombreEmpresa,
                nombreDominio : req.body.nombreDominio,
                rubro : req.body.rubro,
                pais :  req.body.pais,
                correoEmpresa : req.body.correoEmpresa,
                contraseniaEmpresa : hash,
                planActual : req.body.planActual,
                productos : [],
                categorias: [],
                imagenes : [],
                videos : [],
                archivos : [],
                estado : 'activo',
                paginas : []
            }
        );
        await brand.save();

        const token = jwt.sign({_id: brand._id}, 'secretkey');
        res.status(200).json({token, 'idBrand':brand.id});
    })

//Read brands
    router.get('/', function(req, res){
        empresas.find({}, {})
        .then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Update brand
    router.put('/:idBrand', async (req, res) => {
        const salt = 10;
        const hash =  bcrypt.hashSync(req.body.contrasenia, salt);
        await empresas.update(
            {
                _id : req.params.idBrand
            },
            {
                nombreEmpresa : req.body.nombre,
                nombreDominio : req.body.dominio,
                rubro : req.body.rubro,
                pais :  req.body.pais,
                correoEmpresa : req.body.correo,
                contraseniaEmpresa : hash
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

//Delete brand
    router.delete('/:idBrand', function (req, res){
        empresas.remove(
            {
                _id : req.params.idBrand
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

// ---------------- //

//Get brand
    router.get('/:idBrand', function(req, res){
    empresas.find(
        {
            _id: req.params.idBrand
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Get brands plan

    router.get('/:idBrand/plan', function(req, res){
        empresas.aggregate([
            {
                $lookup: {
                    from:"planes",
                    localField: "planActual",
                    foreignField:"_id",
                    as:"plan"
                }
            },
            {
                $match:{
                    "_id": mongoose.Types.ObjectId(req.params.idBrand)
                }
            },
            {
                $project:{
                    plan:true
                }
            }
        ]).then(result => {
            res.send(result);
            res.end();
        }).catch(error  => {
            res.send(error);
            res.end();
        })
    })

//Add products
    router.post('/:idBrand/nuevoProducto', function(req, res){
        empresas.update(
            {
                _id: mongoose.Types.ObjectId(req.params.idBrand)
            },
            {
                $push : {
                    "productos" : {
                        _id: new mongoose.Types.ObjectId(),
                        nombreProducto: req.body.nombreProducto,
                        precio: req.body.precio,
                        categoria :  req.body.categoria,
                        imagen: req.body.imagen
                    }
                }
            }
        ).then(result => {
            res.send(result);
            res.end()
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Update products
    router.post('/:idBrand/productos/:idProduct', function (req, res) {
        empresas.update(
            {
                _id: req.params.idBrand,
                "productos._id": mongoose.Types.ObjectId(req.params.idProduct)
            },
            {
                "productos.$.nombreProducto": req.body.nombreProducto,
                "productos.$.precio" : req.body.precio,
                "productos.$.categoria" :  req.body.categoria,
                "productos.$.imagen": req.body.imagen
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Delete product
    router.delete('/:idBrand/eliminarProducto/:idProducto', function (req, res) {
        let productos; 
        empresas.find(
            {
                _id: req.params.idBrand
            },
            {
                "productos":true,
                _id: false
            }
        ).then(result => {
            res.send(result);
            productos = result[0].productos;
            for(let i in productos){
                if(productos[i]._id==req.params.idProducto){
                    productos.splice(i, 1);
                }
            }
                empresas.update(
                    {
                        _id: req.params.idBrand
                    },
                    {
                        productos : productos
                    }
                ).then(

                ).catch(error2 => {
                    res.send(error2);
                    res.end();
                })
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    })

//Get products
    router.get('/:idBrand/productos', function(req, res){
        empresas.find(
            {
                _id: req.params.idBrand
            },
            {
                productos:true
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end()
        })
    })
  
    
    /******** */
//Add category
    router.post('/:idBrand/nuevaCategoria', function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand
            },
            {
                $push: {
                    "categorias" : {
                        "_id": new mongoose.Types.ObjectId(),
                        "nombre": req.body.nombre
                    }
                }
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Get categories
    router.get('/:idBrand/categorias', function(req, res){
        empresas.find(
            {
                _id: req.params.idBrand
            },
            {
                categorias: true,
                _id: false
            }
        ).then(result => {
            res.send(result[0]);
            res.end();
        }).catch(result => {
            res.send(error);
            res.end();
        });
    });

//Delete category
    router.delete('/:idBrand/eliminarCategoria/:idCategoria', function(req, res){
        let categorias; 
        empresas.find(
            {
                _id: req.params.idBrand
            },
            {
                "categorias":true,
                _id: false
            }
        ).then(result => {
            res.send(result);
            categorias = result[0].categorias;
            for(let i in categorias){
                if(categorias[i]._id==req.params.idCategoria){
                    categorias.splice(i, 1);
                }
            }
                empresas.update(
                    {
                        _id: req.params.idBrand
                    },
                    {
                        categorias : categorias
                    }
                ).then(

                ).catch(error2 => {
                    res.send(error2);
                    res.end();
                })
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    })

    
    
    /****** */
//Add image
    router.post('/:idBrand/nuevaImagen', multer.single('imagen'), async function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand
            },
            {
                $push: {
                    "imagenes" : {
                        _id : new mongoose.Types.ObjectId(),
                        rutaImg : req.file.path,
                        nombre: req.body.nombre,
                        descripcion:req.body.descripcion
                    }
                }
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

//Update image
    router.post('/:idBrand/imagenes/:idImage', function (req, res) {
        empresas.update(
            {
                _id: req.params.idBrand,
                "imagenes._id": mongoose.Types.ObjectId(req.params.idImage)
            },
            {
                "imagenes.$.nombre": req.body.nombre,
                "imagenes.$.descripcion":req.body.descripcion
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Delete image
    router.delete('/:idBrand/eliminarImagen/:idImagen', async function (req, res) {
        let imagenes; 
        await empresas.find(
            {
                _id: req.params.idBrand
            },
            {
                "imagenes":true,
                _id: false
            }
        ).then(result => {
            res.send(result);
            imagenes = result[0].imagenes;
            for(let i in imagenes){
                if(imagenes[i]._id==req.params.idImagen){
                    fs.unlink(path.resolve(imagenes[i].rutaImg));
                    imagenes.splice(i, 1);
                }
            }
                empresas.update(
                    {
                        _id: req.params.idBrand
                    },
                    {
                        imagenes : imagenes
                    }
                ).then(

                ).catch(error2 => {
                    res.send(error2);
                    res.end();
                })
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    })

//Get images
    router.get('/:idBrand/imagenes', function(req, res){
        empresas.find(
            {
                _id: req.params.idBrand
            },
            {
                imagenes: true,
                _id: false
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(result => {
            res.send(error);
            res.end();
        });
    });

//Add video
    router.post('/:idBrand/nuevoVideo',  multer.single('video'), function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand
            },
            {
                $push: {
                    "videos" : {
                        _id : new mongoose.Types.ObjectId(),
                        rutaVideo : req.file.path,
                        nombre: req.body.nombre,
                        descripcion:req.body.descripcion
                    }
                }
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Update video
    router.post('/:idBrand/videos/:idVideo', function (req, res) {
        empresas.update(
            {
                _id: req.params.idBrand,
                "videos._id": mongoose.Types.ObjectId(req.params.idVideo)
            },
            {
                "videos.$.nombre": req.body.nombre,
                "videos.$.descripcion": req.body.descripcion
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Delete video
    router.delete('/:idBrand/eliminarVideo/:idVideo', async  function (req, res) {
    let videos; 
    await empresas.find(
        {
            _id: req.params.idBrand
        },
        {
            "videos":true,
            _id: false
        }
    ).then(result => {
        res.send(result);
        videos = result[0].videos;
        for(let i in videos){
            if(videos[i]._id==req.params.idVideo){
                fs.unlink(path.resolve(videos[i].rutaVideo));
                videos.splice(i, 1);
            }
        }
            empresas.update(
                {
                    _id: req.params.idBrand
                },
                {
                    videos : videos
                }
            ).then(

            ).catch(error2 => {
                res.send(error2);
                res.end();
            })
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
})

//Get videos
    router.get('/:idBrand/videos', function(req, res){
    empresas.find(
        {
            _id: req.params.idBrand
        },
        {
            videos: true,
            _id: false
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(result => {
        res.send(error);
        res.end();
    });
});

//Add files
    router.post('/:idBrand/nuevoArchivo', multer.single('archivo'), async function(req, res){
    empresas.update(
        {
            _id: req.params.idBrand
        },
        {
            $push: {
                "archivos" : {
                    _id : new mongoose.Types.ObjectId(),
                    rutaFile : req.file.path,
                    nombre: req.body.nombre,
                    descripcion:req.body.descripcion
                }
            }
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Update files
    router.post('/:idBrand/archivos/:idFile', function (req, res) {
    empresas.update(
        {
            _id: req.params.idBrand,
            "archivos._id": mongoose.Types.ObjectId(req.params.idFile)
        },
        {
            "archivos.$.nombre": req.body.nombre,
            "archivos.$.descripcion": req.body.descripcion
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Delete files
    router.delete('/:idBrand/eliminarArchivo/:idFile', async function (req, res) {
    let archivos; 
    await empresas.find(
        {
            _id: req.params.idBrand
        },
        {
            "archivos":true,
            _id: false
        }
    ).then(result => {
        archivos = result[0].archivos;
        for(let i in archivos){
            if(archivos[i]._id==req.params.idFile){ 
                fs.unlink(path.resolve(archivos[i].rutaFile));
                archivos.splice(i, 1);
            }
        }
        empresas.update(
                {
                    _id: req.params.idBrand
                },
                {
                    archivos : archivos
                }
            ).then(

            ).catch(error2 => {
                res.send(error2);
                res.end();
            })
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
    })

//Get files
    router.get('/:idBrand/archivos', function(req, res){
    empresas.find(
        {
            _id: req.params.idBrand
        },
        {
            archivos: true,
            _id: false
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(result => {
        res.send(error);
        res.end();
    });
    });

//Add pages

    router.post('/:idBrand/nuevaPagina', function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand
            },
            {
                $push: {
                    "paginas" : {
                        _id : new mongoose.Types.ObjectId(),
                        encabezadoGenerico: req.body.encabezado,
                        piePaginaGenerico: req.body.footer,
                        favicon: req.body.favicon,
                        logotipo: req.body.logotipo,
                        tituloSitio: req.body.titulo,
                        descripcion: req.body.descripcion,
                        palabrasClave: req.body.palabrasClave,
                        codigo: req.body.codigo,
                        cssExtra: req.body.css,
                        jsExtra: req.body.js
                    }
                }
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Update pages

    router.post('/:idBrand/paginas/:idPage', function (req, res) {
    empresas.update(
        {
            _id: req.params.idBrand,
            "paginas._id": mongoose.Types.ObjectId(req.params.idPage)
        },
        {
            "paginas.$.encabezadoGenerico": req.body.encabezado,
            "paginas.$.piePaginaGenerico": req.body.footer,
            "paginas.$.favicon": req.body.favicon,
            "paginas.$.logotipo": req.body.logotipo,
            "paginas.$.tituloSitio": req.body.titulo,
            "paginas.$.descripcion": req.body.descripcion,
            "paginas.$.palabrasClave": req.body.palabrasClave
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Delete pages
    router.delete('/:idBrand/eliminarPagina/:idPage', function (req, res) {
    let paginas; 
    empresas.find(
        {
            _id: req.params.idBrand
        },
        {
            "paginas":true,
            _id: false
        }
    ).then(result => {
        paginas = result[0].paginas;
        for(let i in paginas){
            if(paginas[i]._id==req.params.idPage){
                paginas.splice(i, 1);
            }
        }
            empresas.update(
                {
                    _id: req.params.idBrand
                },
                {
                    paginas : paginas
                }
            ).then(

            ).catch(error2 => {
                res.send(error2);
                res.end();
            })
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
    })

//Get pages

    router.get('/:idBrand/paginas', function(req, res){
    empresas.find(
        {
            _id: req.params.idBrand
        },
        {
            paginas: true,
            _id: false
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(result => {
        res.send(error);
        res.end();
    });
    });

//Get page
    router.get('/:idBrand/paginas/:idPage', function(req, res){
        empresas.find(
            {
                _id: req.params.idBrand,
                "paginas._id" : mongoose.Types.ObjectId(req.params.idPage)
            },
            {
                "paginas.$": true,
                _id: false
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(result => {
            res.send(error);
            res.end();
        });
    });

//Update source code
    router.post('/:idBrand/paginas/:idPage/codigo', function (req, res) {
    empresas.update(
        {
            _id: req.params.idBrand,
            "paginas._id": mongoose.Types.ObjectId(req.params.idPage)
        },
        {
            "paginas.$.codigo": req.body.codigo,
            "paginas.$.cssExtra": req.body.css,
            "paginas.$.jsExtra": req.body.js
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Update plan
    router.post('/:idBrand/plan/:idPlan', function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand,
                planActual : req.params.idPlan
            },
            {
                planActual : req.body.plan
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.send();
        })
    });

//Update state
    router.post('/:idBrand/estado/:estado', function(req, res){
    empresas.update(
        {
            _id: req.params.idBrand,
        },
        {
            estado: req.params.estado
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.send();
    })
});



module.exports = router;