'use strict';

var extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    representanteSchema = usuarioSchema.extend({
        puesto: String,
        suplente: String,
        'representante general': {type: ObjectId, ref: 'usuario'},
        casilla: {type: ObjectId, ref: 'casilla'}
    });

module.exports = representanteSchema;