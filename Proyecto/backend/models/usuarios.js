var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombreUsuario: String,
        apellidoUsuairo: String,
        pais: String,
        fechaNacimiento : String,
        correoUsuario:String,
        contraseniaUsuario: String,
        genero : String,
        compras : Array
    }
)

module.exports = mongoose.model('usuarios', esquema);