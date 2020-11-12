var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombreEmpresa : String,
        nombreDominio : String,
        rubro : String,
        pais :  String,
        correoEmpresa : String,
        contraseniaEmpresa : String,
        planActual : String,
        productos : Array,
        categorias: Array,
        estado : String
    }
)

module.exports = mongoose.model('empresas', esquema);