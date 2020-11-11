var express = require('express');
var router = express.Router();
var plantillas = require('../models/plantillas');

//Create template
    router.post('/', function(req, res){
        let template = new plantillas(
            {
                tituloTema: req.body.titulo,
                descripcion : req.body.descripcion,
                imagenes : JSON.parse(req.body.imagenes),
                codigo: req.body.codigo
            }
        );
        template.save().then(result => {
            res.send(result);
            res.end();
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
                tituloTema : req.body.titulo,
                descripcion : req.body.descripcion,
                imagenes: JSON.parse(req.body.imagenes),
                codigo : req.body.codigo
            }
        ).then(result => {
            res.send(result);
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
