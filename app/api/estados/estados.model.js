'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    estadosSchema = new Schema({
        id: Number,
        capital: String,
        nombre: String,
        municipios: Array
    });

module.exports = mongoose.model('estados', estadosSchema);