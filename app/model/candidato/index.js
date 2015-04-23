'use strict';

var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../schema/usuario'),
    candidatoSchema = usuarioSchema.extend({
        candidatura: String,
        acceptTerminos: Boolean
    });

module.exports = mongoose.model('candidato', candidatoSchema);