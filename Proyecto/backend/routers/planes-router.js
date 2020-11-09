var express = require('express');
var router = express.Router();
var planes = require('../models/planes');
var mongoose = require('mongoose');

//Create plan
    router.post('/', function (req, res) {
        let plan = new planes(
            {
                nombrePlan : req.body.nombre,
                cantidadPaginas: req.body.paginas,
                cantidadProductos : req.body.productos,
                precioPlan : req.body.precio
            }
        );
        plan.save().then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    })

//Read plans
    router.get('/', function(req, res){
        planes.find({}, {})
        .then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

//Update plan
    router.put('/:idPlan', function(req, res){
        planes.update(
            {
                _id: req.params.idPlan
            },
            {
                nombrePlan : req.body.nombre,
                cantidadPaginas: req.body.paginas,
                cantidadProductos : req.body.productos,
                precioPlan : req.body.precio
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })


//Delete plan
    router.delete('/:idPlan', function(req, res){
        planes.remove(
            {
                _id: req.params.idPlan
            }
        ).then(result=>{
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })


// --------- //

//Get plan
    router.get('/:idPlan', function(req, res){
        planes.find(
            {
                _id: req.params.idPlan
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