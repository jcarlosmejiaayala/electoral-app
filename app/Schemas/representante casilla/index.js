'use strict';

var extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    simpatizanteSchema = require('../../Schemas/simpatizante'),
    representanteSchema = usuarioSchema.extend({
        suplente: String,
        seccion: Number,
        simpatizante: [simpatizanteSchema]
    });

module.exports = representanteSchema;