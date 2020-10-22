var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.listen(8888, function(){
    console.log('Servidor levantado');
})