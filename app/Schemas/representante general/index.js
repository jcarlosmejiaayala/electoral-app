'use strict';

var extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    representanteSchema = usuarioSchema.extend({
        secciones: Array,
        puesto: String,
        distrito: Number,
        candidato: {type: ObjectId, ref: 'usuario'}
    });

module.exports = representanteSchema;