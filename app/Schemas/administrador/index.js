'use strict';

var Schema = require('mongoose').Schema,
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../Schemas/usuario'),
    administradorSchema = usuarioSchema.extend({
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'}
    });

module.exports = administradorSchema;