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
    console.log(correo);
    const admin = await admins.findOne({'correoAdmin':correo})

    if(!admin){
        return res.status(401).send("Admin not found");
    }

    if(!bcrypt.compareSync(password, admin.contraseniaAdmin)){
        return res.status(401).send('Wrong password');
    }
    
    const token = jwt.sign({_id: admin._id}, 'secretKey');
    return res.status(200).json({token});
})


// --------------//

//Create admin
    router.post('/signup', async (req, res) => {
        const salt = 10;
        const hash = bcrypt.hashSync(req.body.contrasenia, salt)

        let admin = new admins(
            {
                nombreAdmin : req.body.nombre,
                apellidoAdmin : req.body.apellido,
                correoAdmin : req.body.correo,
                contraseniaAdmin : hash,
                estado: 'activo'
            }
        );
        await admin.save()/*.then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });*/

        const token = jwt.sign({_id: admin._id}, 'secretKey');
        res.status(200).json({"message": "ok"})
    });

//Read admins
    router.get('/', function(req, res){
        admins.find({},{})
        .then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(result);
            res.end();
        })
    })

//Update admin
    router.put('/:idAdmin', async (req, res) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.contrasenia, salt)
        await admins.update(
            {
                _id: req.params.idAdmin
            },
            {
                nombreAdmin : req.body.nombre,
                apellidoAdmin : req.body.apellido,
                correoAdmin : req.body.correo,
                contraseniaAdmin : hash,
                estado: 'activo'
            }
        ).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
    });

//Delete admin
    router.delete('/:idAdmin', function(req, res){
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
    router.get('/:idAdmin', function(req, res){
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


module.exports = router;