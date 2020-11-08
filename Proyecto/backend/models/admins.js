var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombreAdmin : String,
        apellidoAdmin : String,
        correoAdmin : String,
        contraseniaAdmin : String
    }
);

module.exports = mongoose.model('admins', esquema);