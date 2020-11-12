var express = require('express');
var router = express.Router();
var empresas = require('../models/empresas');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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
                estado : 'activo'
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
        await 
    })

//Delete brand


// ---------------- //


//Get brand


//Update state


//Update products


//Update category


//Delete product



module.exports = router;