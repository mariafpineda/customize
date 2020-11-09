var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombreAdmin : String,
        apellidoAdmin : String,
        correoAdmin : String,
        contraseniaAdmin : String,
        estado: String
    }
);

module.exports = mongoose.model('admins', esquema);