'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../schema/usuario'),
    representanteSchema = usuarioSchema.extend({
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'},
        rgeneral: {type: Schema.Types.ObjectId, ref: 'usuario'},
        distrito: {type: Schema.Types.ObjectId, ref: 'distrito'}
    });

module.exports = mongoose.model('representante-casilla', representanteSchema);