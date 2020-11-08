var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        codigo: String
    }
)

module.exports = mongoose.model('plantillas', esquema);