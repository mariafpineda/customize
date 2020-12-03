var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        urlImagen:String
    }
)

module.exports = mongoose.model('imagenes', esquema);