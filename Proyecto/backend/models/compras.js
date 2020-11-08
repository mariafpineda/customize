var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        usuarioCompra : String,
        articulos: Array,
        totalCompra : Number
    }
);

module.exports = mongoose.model('compras', esquema);