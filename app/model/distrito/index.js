'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    distritoSchema = new Schema({
        numero: Number,
        isBusy: {
            type: Boolean,
            default: false
        },
        candidato: {type: Schema.Types.ObjectId, ref: 'usuario'}
    }, {collection: 'distrito'});

module.exports =  mongoose.model('distrito', distritoSchema);