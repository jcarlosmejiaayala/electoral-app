'use strict';

var extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    simpatizanteSchema = usuarioSchema.extend({
        voto: {
            type: Boolean,
            default: false
        }
    });

module.exports = simpatizanteSchema;