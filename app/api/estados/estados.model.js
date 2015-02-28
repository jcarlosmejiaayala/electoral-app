'use strict';

var mongoose = require('mongoose'),
    estadosSchema = require('../../Schemas/estado');

module.exports = mongoose.model('estados', estadosSchema);