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
                video : [],
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

//Get videos

//Update video

//Delete video

//Add files

//Get files

//Update file 

//Delete file

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