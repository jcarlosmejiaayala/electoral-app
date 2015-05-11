'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    seccionSchema = new Schema({
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'},
        distrito: {type: Schema.Types.ObjectId, ref: 'distrito'},
        rgeneral: {type: Schema.Types.ObjectId, ref: 'usuario'},
        rcasilla: {type: Schema.Types.ObjectId, ref: 'usuario'},
        numero: Number
    }, {collection: 'seccion'});

module.exports = mongoose.model('seccion', seccionSchema);