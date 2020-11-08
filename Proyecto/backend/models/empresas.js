var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombreEmpresa : String,
        nombreDomino : String,
        rubro : String,
        pais :  String,
        correoEmpresa : String,
        contraseniaEmpresa : String,
        planActual : String
    }
)

module.exports = mongoose.model('empresas', esquema);