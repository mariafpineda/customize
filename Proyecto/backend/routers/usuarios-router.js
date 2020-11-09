var express = require('express');
var router = express.Router();
var usuarios = require('../models/usuarios');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Create user
router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await  bcrypt.hash(req.body.contrasenia, salt)
    console.log(hash);
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
    })
})

//Update user


//Delete user


//Otras funciones

async function hashPassword(password) {
    
    return hash;
}

module.exports = router;