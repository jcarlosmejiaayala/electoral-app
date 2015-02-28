'use strict';

var extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    simpatizanteSchema = usuarioSchema.extend({
        'representante casilla': {type: ObjectId, ref: 'usuario'}
    });

module.exports = simpatizanteSchema;