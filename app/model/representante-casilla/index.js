'use strict';

var extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../schema/usuario'),
    representanteSchema = usuarioSchema.extend({
        suplente: String,
        seccion: {type: Schema.Types.ObjectId, ref: 'seccion'},
        simpatizantes: [{type: Schema.Types.ObjectId, ref: 'simpatizante'}]
    });

module.exports = representanteSchema;