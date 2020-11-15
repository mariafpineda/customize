var express = require('express');
var router = express.Router();
var shortcuts = require('../models/shortcuts');
var mongoose = require('mongoose');
const usuarios = require('../models/usuarios');

//Create shortcut
    router.post('/', function(req, res){
        let shortcut = new shortcuts(
            {
                tipo: req.body.tipo,
                plantilla: req.body.plantilla
            }
        );
        shortcut.save().then( result => {
            res.send(result);
            res.end();
        }).catch(error=>{
            res.send(error);
            res.end();
        })
    });

//Read shortcut
    router.get('/',  function(req, res){
        shortcuts.find({}, {})
        .then(result => {
            res.send(result);
            res.end();
       }).catch(error => {
           res.send(error);
           res.end();
       })
    })

//Update shortcut
    router.put('/:tipo', function(req, res){
        shortcuts.update(
            {
                tipo: req.params.tipo
            },
            {
                tipo: req.body.tipo,
                plantilla: req.body.plantilla
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

//Delete shortcut
    router.delete('/:idShortcut', function(req, res){
        shortcuts.remove(
            {
                _id: req.params.idShortcut
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    });


// ------------ //

//Get plantilla shortcut

    router.get('/:tipo', function(req, res){
        shortcuts.find(
            {
                tipo: req.params.tipo
            },
            {
                "plantilla":true,
                "_id": false
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

module.exports = router;
