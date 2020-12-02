var express = require('express');
var cors = require('cors');
var path = require('path')
var bodyParser = require('body-parser');
var database = require('./modules/database');
var usuariosRouter= require('./routes/usuarios-router');
var adminsRouter= require('./routes/admins-router');
var empresasRouter= require('./routes/empresas-router');
var planesRouter= require('./routes/planes-router');
var plantillasRouter= require('./routes/plantillas-router');
var shortcutsRouter= require('./routes/shortcuts-router');
var imagenesRouter = require('./routes/imagenes-router');


var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/usuarios', usuariosRouter);
app.use('/admins', adminsRouter);
app.use('/empresas', empresasRouter);
app.use('/planes', planesRouter);
app.use('/plantillas', plantillasRouter);
app.use('/shortcuts', shortcutsRouter);
app.use('/imagenes', imagenesRouter);

//Esto folder es para subir los archivos
app.use('/uploads', express.static(path.resolve('uploads')));

app.listen(8888, function(){
    console.log('Servidor levantado');
})