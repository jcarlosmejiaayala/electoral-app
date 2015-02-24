'use strict';

var mongoose = require('mongoose'),
    usuarioSchema = require('../../Schemas/usuario');

module.exports = mongoose.model('usuario', usuarioSchema);