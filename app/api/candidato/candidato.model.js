'use strict';

var mongoose = require('mongoose'),
    candidatoSchema = require('../../Schemas/candidato');

module.exports = mongoose.model('candidato', candidatoSchema);