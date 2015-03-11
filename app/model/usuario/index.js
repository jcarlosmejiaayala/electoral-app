'use strict';

var mongoose = require('mongoose'),
    usuarioSchema = require('../../schema/usuario');

module.exports = mongoose.model('usuario', usuarioSchema);