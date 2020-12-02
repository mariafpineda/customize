var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {   
        tituloTema: String,
        descripcion : String,
        imagenes: Array,
        codigoHTML: String,
        codigoCSS: String,
        codigoJS: String
    }
)

module.exports = mongoose.model('plantillas', esquema);