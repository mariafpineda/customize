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

//Delete template

module.exports = router;
