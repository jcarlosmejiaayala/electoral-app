'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    casillaSchema = new Schema({
        distrito: Number,
        seccion: Number,
        localidad: Number,
        manzana: Number,
        domicilio: String,
        cp: String,
        municipio: String,
        estado: String,
        ubicacion: String,
        referencia: String,
        tipo: Number,
        punto: String
    }, {collection: 'casilla'});

module.exports = casillaSchema;