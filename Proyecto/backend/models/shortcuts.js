var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        tipo: String,
        plantilla: Array
    }
);

module.exports = mongoose.model('shortcuts', esquema);