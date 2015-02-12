'use strict';

var express = require('express'),
    controller = require('./estados.controller'),
    router = express.Router();

router.get('/:estado', controller.getMunicipios);

module.exports = router;