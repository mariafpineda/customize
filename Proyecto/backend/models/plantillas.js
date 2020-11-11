var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {   
        tituloTema: String,
        descripcion : String,
        imagenes: Array,
        codigo: String
    }
)

module.exports = mongoose.model('plantillas', esquema);