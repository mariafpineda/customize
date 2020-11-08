var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombreUsuario: String,
        apellidoUsuairo: String,
        pais: String,
        fechaNacimiento : Date,
        correoUsuario: String,
        contraseniaUsuario : String,
        genero : String
    }
)

module.exports = mongoose.model('usuarios', esquema);