'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../schema/usuario'),
    administradorSchema = usuarioSchema.extend({
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'}
    });

module.exports = mongoose.model('administrador', administradorSchema);
