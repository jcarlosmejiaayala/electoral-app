'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../schema/usuario'),
    simpatizanteSchema = usuarioSchema.extend({
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'},
        rgeneral: {type: Schema.Types.ObjectId, ref: 'usuario'},
        rcasilla: {type: Schema.Types.ObjectId, ref: 'usuario'},
        distrito: {type: Schema.Types.ObjectId, ref: 'distrito'},
        seccion: {type: Schema.Types.ObjectId, ref: 'seccion'},
        voto: {
            type: Boolean,
            default: false
        }
    });

module.exports = mongoose.model('simpatizante', simpatizanteSchema);