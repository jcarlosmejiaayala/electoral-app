'use strict';

var mongoose = require('mongoose'),
    administradoSchema = require('../../Schemas/administrador');


module.exports = mongoose.model('administrador', administradoSchema);
