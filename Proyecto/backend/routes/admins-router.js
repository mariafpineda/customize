var express = require('express');
var router = express.Router();
var admins = require('../models/admins');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Login admin

router.post("/signin", async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.contrasenia;
    const admin = await admins.findOne({'correoAdmin':correo})

    if(!admin){
        return res.status(401).json({'message':"No se encontró ningún administrador registrado con ese correo electrónico"});
    }

    if(!bcrypt.compareSync(password, admin.contraseniaAdmin)){
        return res.status(401).json({'message':'Contraseña incorrecta'});
    }
    
    const token = jwt.sign({_id: admin._id}, 'secretkey');
    return res.status(200).json({token, 'idAdmin': admin._id});
})


// --------------//

//Create admin
    router.post('/signup', async (req, res) => {
        const salt = 10;
        const hash = await bcrypt.hashSync(req.body.contraseniaAdmin, salt)
        const email = await admins.findOne({'correoAdmin': req.body.correoAdmin})

        if(email){
            return res.status(401).json({'message':'El correo ingresado ya está registrado'});
        }
            
        let admin = new admins(
            {
                nombreAdmin : req.body.nombreAdmin,
                apellidoAdmin : req.body.apellidoAdmin,
                correoAdmin : req.body.correoAdmin,
                contraseniaAdmin : hash,
                estado: 'activo'
            }
        );
        await admin.save()

        const token = jwt.sign({_id: admin._id}, 'secretkey');
        res.status(200).json({'message':'Nuevo administrador ingresado exitosamente.'});
    });

//Read admins
    router.get('/', verifyToken, function(req, res){
        admins.find({},{})
        .then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(result);
            res.end();
        })
    })

//Update admin without password
    router.put('/:idAdmin', verifyToken, async (req, res) => {

        await admins.update(
            {
                _id: req.params.idAdmin
            },
            {
                nombreAdmin : req.body.nombreAdmin,
                apellidoAdmin : req.body.apellidoAdmin,
                correoAdmin : req.body.correoAdmin,
                estado: 'activo'
            }
        ).then(result => {
            res.status(200).json({'message':'Datos actualizados exitosamente.'})
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Delete admin
    router.delete('/:idAdmin', verifyToken, function(req, res){
        admins.remove(
            {
                _id: req.params.idAdmin
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

// ------------ //



//Get admin
    router.get('/:idAdmin', verifyToken, function(req, res){
        admins.find(
            {_id: req.params.idAdmin}
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Update password
router.put('/:idAdmin/password', verifyToken, async (req, res) => {
    const salt=10;
    const hash= await bcrypt.hashSync(req.body.contraseniaAdmin, salt);
    await admins.update(
        {
            _id: req.params.idAdmin
        },
        {
            contraseniaAdmin:hash
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, 'secretkey');
    req.adminId = payload._id;
    next();
}