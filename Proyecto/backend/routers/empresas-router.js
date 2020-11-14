var express = require('express');
var router = express.Router();
var empresas = require('../models/empresas');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const usuarios = require('../models/usuarios');

//Create brand
    router.post('/', async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.contrasenia, salt);
        let brand = new empresas(
            {
                nombreEmpresa : req.body.nombre,
                nombreDominio : req.body.dominio,
                rubro : req.body.rubro,
                pais :  req.body.pais,
                correoEmpresa : req.body.correo,
                contraseniaEmpresa : hash,
                planActual : req.body.idPlan,
                productos : [],
                categorias: [],
                imagenes : [],
                videos : [],
                archivos : [],
                estado : 'activo',
                paginas : []
            }
        );
        await brand.save().then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
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
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.contrasenia, salt);
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
                        categoria :  req.body.categoria
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
                "productos.$.categoria" :  req.body.categoria
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
    router.delete('/:idBrand/eliminarProductos/:idProducto', function (req, res) {
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

//Add category
    router.post('/:idBrand/nuevaCategoria/:categoria', function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand
            },
            {
                $push: {
                    "categorias" : req.params.categoria
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
            res.send(result);
            res.end();
        }).catch(result => {
            res.send(error);
            res.end();
        });
    });

//Add image
    router.post('/:idBrand/nuevaImagen', function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand
            },
            {
                $push: {
                    "imagenes" : {
                        _id : new mongoose.Types.ObjectId(),
                        rutaImg : req.body.rutaImg
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
                "imagenes.$.rutaImg": req.body.ruta
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
    router.delete('/:idBrand/eliminarImagen/:idImagen', function (req, res) {
        let imagenes; 
        empresas.find(
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
    router.post('/:idBrand/nuevoVideo', function(req, res){
        empresas.update(
            {
                _id: req.params.idBrand
            },
            {
                $push: {
                    "videos" : {
                        _id : new mongoose.Types.ObjectId(),
                        rutaVideo : req.body.rutaVideo
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
                "videos.$.rutaVideo": req.body.ruta
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
router.delete('/:idBrand/eliminarVideo/:idVideo', function (req, res) {
    let videos; 
    empresas.find(
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
router.post('/:idBrand/nuevoArchivo', function(req, res){
    empresas.update(
        {
            _id: req.params.idBrand
        },
        {
            $push: {
                "archivos" : {
                    _id : new mongoose.Types.ObjectId(),
                    rutaFile : req.body.rutaFile
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
            "archivos.$.rutaFile": req.body.ruta
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
    router.delete('/:idBrand/eliminarArchivo/:idFile', function (req, res) {
    let archivos; 
    empresas.find(
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

//Add page

//Update page

//Delete page

//Get page

//Add source code to page

//Update source code


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