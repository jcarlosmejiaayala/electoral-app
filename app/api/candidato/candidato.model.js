'use strict';

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario');

var candidatoSchema = usuarioSchema.extend({
    candidatura: String,
    distrito: Number,
    partido: String
});

module.exports = mongoose.model('candidato', candidatoSchema);