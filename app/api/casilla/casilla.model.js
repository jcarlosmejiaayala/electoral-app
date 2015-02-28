'use strict';

var mongoose = require('mongoose'),
    casillaSchema = require('../../Schemas/casilla');

module.exports = mongoose.model('casilla', casillaSchema);