'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    seccionSchema = new Schema({
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'},
        distrito: {type: Schema.Types.ObjectId, ref: 'distrito'},
        numero: Number,
        isBusy: {type: Boolean, default: false}
    }, {collection: 'seccion'});

module.exports = mongoose.model('seccion', seccionSchema);