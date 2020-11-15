var express = require('express');
var router = express.Router();
var usuarios = require('../models/usuarios');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')


//Login user
    router.post("/signin", async (req, res) => {
        const correo = req.body.correo;
        const password = req.body.contrasenia;
        const user = await usuarios.findOne({'correoUsuario':correo})

        if(!user){
            return res.status(401).send("User not found");
        }

        if(!bcrypt.compareSync(password, user.contraseniaUsuario)){
            return res.status(401).send('Wrong password');
        }
        
        const token = jwt.sign({_id: user._id}, 'secretkey');
        return res.status(200).json({token});
    })

//------------//

//Create user
    router.post('/signup', async (req, res) => {
        const salt = 10;
        const hash = await bcrypt.hashSync(req.body.contraseniaUsuario, salt)
        let user = new usuarios(
            {
                nombreUsuario: req.body.nombreUsuario,
                apellidoUsuairo: req.body.apellidoUsuario,
                pais: req.body.pais,
                fechaNacimiento : req.body.fechaNacimiento,
                correoUsuario: req.body.correoUsuario,
                contraseniaUsuario : hash,
                genero : req.body.genero,
                compras : []
            }
        );
        await user.save()
        const token = jwt.sign({_id: user._id}, 'secretkey');
        res.status(200).json({token});
    });

//Read user
    router.get('/', verifyToken, function(req, res){
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
    router.put('/:idUser', verifyToken, async (req, res) => {
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
    router.delete('/:idUser', verifyToken, function(req, res){
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

// --------------- //


//Get user
    router.get('/:idUser', verifyToken, function(req, res){
        usuarios.find({_id:  req.params.idUser})
        .then(result =>{
            res.send(result);
            res.end();
        }).catch(error =>{
            res.send(error);
            res.end();
        });
    });

//Get purchases
    router.get('/:idUser/compras',verifyToken, function(req, res){
        usuarios.find(
            { _id : mongoose.Types.ObjectId(req.params.idUser)},
            {compras:true}
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

    
//Get purchase
    router.get('/:idUser/compras/:idCompra', verifyToken, function(req, res){
        usuarios.find(
            {
                _id: req.params.idUser,
                "compras._id": mongoose.Types.ObjectId(req.params.idCompra)
            },
            {"compras.$":true}
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

// Add purchase 

    router.post('/:idUser/nuevaCompra', verifyToken, function(req, res){
        usuarios.update(
            {
                _id: mongoose.Types.ObjectId(req.params.idUser)
            },
            {
                $push: {
                    "compras":{
                        _id: new mongoose.Types.ObjectId(),
                        articulos: JSON.parse(req.body.articulos),
                        totalCompra: req.body.totalCompra
                    }
                }
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    });

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, 'secretkey')
    console.log(payload);
    req.userId = payload._id;
    next();
}