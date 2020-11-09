var express = require('express');
var router = express.Router();
var compras = require ('../models/compras');
var mongoose = require('mongoose');

//Create purchase


//Read all purchases
    router.get('/', function(req, res){
        compras.find({}, {})
        .then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Update purchase


//Delete purchase


//Get purchase
router.get('/:idCompra', function(req, res){
    compras.find(
        {
            _id: req.params.idCompra
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});