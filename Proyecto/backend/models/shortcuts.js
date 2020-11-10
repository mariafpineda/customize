var mongoose = require('mongoose');

var esquema = new mongoose.Schema(
    {
        tipo: String,
        plantilla: String
    }
);

module.exports = mongoose.model('shortcuts', esquema);