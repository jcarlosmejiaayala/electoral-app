'use strict';

var Schema = require('mongoose').Schema,
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    representanteSchema = usuarioSchema.extend({
        distrito: {
            numero: Number,
            secciones: [Number]
        },
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'}
    });

module.exports = representanteSchema;