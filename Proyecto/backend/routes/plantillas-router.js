var express = require('express');
var router = express.Router();
var multer = require('../libs/multer');
var plantillas = require('../models/plantillas');

//Create template
    router.post('/', function(req, res){
        let template = new plantillas(
            {
                tituloTema: req.body.tituloTema,
                descripcion : req.body.descripcion,
                imagenes : req.body.imagenes,
                codigoHTML: req.body.codigoHTML,
                codigoCSS: req.body.codigoCSS,
                codigoJS: req.body.codigoJS
            }
        );
        template.save().then(result => {
            res.status(200).json({'message':'Plantilla agregada correctamente.'});
            res.end()
        }).catch(error => {
            res.send(error);
            res.end();
        })
    });

//Read templates
    router.get('/', function(req, res){
        plantillas.find({}, {})
        .then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    });

//Update template
    router.put('/:idTemplate', function(req, res){
        plantillas.update(
            {
                _id: req.params.idTemplate
            },
            {
                tituloTema : req.body.tituloTema,
                descripcion : req.body.descripcion,
                imagenes: req.body.imagenes,
                codigoHTML: req.body.codigoHTML,
                codigoCSS: req.body.codigoCSS,
                codigoJS: req.body.codigoJS
            }
        ).then(result => {
            res.status(200).json({message:'Plantilla actualizada correctamente.'});
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    })

//Delete template
    router.delete('/:idTemplate', function(req, res){
        plantillas.remove(
            {
                _id: req.params.idTemplate
            }
        ).then(result =>{
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

// ------- //

//Get template
    router.get('/:idTemplate', function(req, res){
        plantillas.find(
            {
                _id: req.params.idTemplate
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

//Create image


//Update images on template
router.put('/:idTemplate/imagenes', function(req, res){
    plantillas.update(
        {
            _id: req.params.idTemplate
        },
        {
            imagenes: JSON.parse(req.body.imagenes)
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
})



module.exports = router;
