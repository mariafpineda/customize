var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombrePlan : String,
        cantidadPaginas: Number,
        cantidadProductos : Number,
        precioPlan : Number
    }
)

module.exports = mongoose.model('planes', esquema);