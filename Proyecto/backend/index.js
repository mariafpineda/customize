var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./modules/database');
var usuariosRouter= require('./routers/usuarios-router');
var adminsRouter= require('./routers/admins-router');
var empresasRouter= require('./routers/empresas-router');
var planesRouter= require('./routers/planes-router');
var comprasRouter= require('./routers/compras-router');
var plantillasRouter= require('./routers/plantillas-router');
var shortcutsRouter= require('./routers/shortcuts-router');


var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/usuarios', usuariosRouter);
app.use('/admins', adminsRouter);
//app.use('/empresas', empresasRouter);
app.use('/planes', planesRouter);
/*app.use('/compras', comprasRouter);
app.use('/plantillas', plantillasRouter);
app.use('/shortcuts', shortcutsRouter);*/

app.listen(8888, function(){
    console.log('Servidor levantado');
})