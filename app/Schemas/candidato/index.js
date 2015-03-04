'use strict';

var extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    candidatoSchema = usuarioSchema.extend({
        candidatura: String,
        distrito: [{
            numero: Number,
            secciones: [Number]
        }]
    });

module.exports = candidatoSchema;