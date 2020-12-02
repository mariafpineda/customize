var express = require('express');
var router = express.Router();
var multer = require('../libs/multer');
var imagenes = require('../models/imagenes');
var path = require('path');
var fs = require('fs-extra');

//Create photo

router.post('/', multer.single('imagenes'), async function(req, res){
    let photo = new imagenes(
        {
            urlImagen: req.file.path,
            nombreImagen: req.body.nombreImagen
        }
    );

    await photo.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});

//Get photos
router.get('/', async function(req, res){
    imagenes.find({}, {})
    .then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})


//Delete photo

router.delete('/:idImage', async function(req, res){
    await imagenes.findByIdAndDelete(
            {_id: req.params.idImage}
    ).then(result => {
        if(result){
            fs.unlink(path.resolve(result.urlImagen));
        }
        res.json(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})


module.exports = router;