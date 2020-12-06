var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        nombreEmpresa : String,
        nombreDominio : String,
        rubro : String,
        pais :  String,
        correoEmpresa : String,
        contraseniaEmpresa : String,
        planActual : mongoose.Types.ObjectId,
        productos : Array,
        categorias: Array,
        estado : String,
        imagenes : Array,
        videos: Array,
        archivos : Array,
        paginas :  Array

    }
)

module.exports = mongoose.model('empresas', esquema);