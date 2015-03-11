'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    extend = require('mongoose-schema-extend'),
    usuarioSchema = require('../../schema/usuario'),
    representanteSchema = usuarioSchema.extend({
        distrito: {type: Schema.Types.ObjectId, ref: 'distrito'},
        secciones: [{type: Schema.Types.ObjectId, ref: 'seccion'}],
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'}
    });

module.exports = mongoose.model('representante-general', representanteSchema);
