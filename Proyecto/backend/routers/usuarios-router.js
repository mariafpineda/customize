var express = require('express');
var router = express.Router();
var usuarios = require('../models/usuarios');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Create user
    router.post('/', async (req, res) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await  bcrypt.hash(req.body.contrasenia, salt)
        let user = new usuarios(
            {
                nombreUsuario: req.body.nombre,
                apellidoUsuairo: req.body.apellido,
                pais: req.body.pais,
                fechaNacimiento : req.body.fecha,
                correoUsuario: req.body.correo,
                contraseniaUsuario : hash,
                genero : req.body.genero
            }
        );
        await user.save().then(result=>{
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Read user
    router.get('/', function(req, res){
        usuarios.find({}, {})
        .then(result => {
            res.send(result);
            res.end()
        }).catch(error =>{
            res.send(error);
            res.end();
        });
    });

//Update user
    router.put('/:idUser', async (req, res) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await  bcrypt.hash(req.body.contrasenia, salt)
        await usuarios.update(
            {
                _id: req.params.idUser
            },
            {
                nombreUsuario: req.body.nombre,
                apellidoUsuairo: req.body.apellido,
                pais: req.body.pais,
                fechaNacimiento : req.body.fecha,
                correoUsuario: req.body.correo,
                contraseniaUsuario : hash,
                genero : req.body.genero
            }
        ).then(result=>{
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(result);
            res.end();
        });
    });

//Delete user
    router.delete('/:idUser', function(req, res){
        usuarios.remove(
            {
                _id: req.params.idUser
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Get user
    router.get('/:idUser', function(req, res){
        usuarios.find({_id:  req.params.idUser})
        .then(result =>{
            res.send(result);
            res.end();
        }).catch(error =>{
            res.send(error);
            res.end();
        });
    });


module.exports = router;