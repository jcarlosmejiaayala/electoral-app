'use strict';

var express = require('express'),
    controller = require('./casilla.controller'),
    router = express.Router();

router.get('/', controller.index);

module.exports = router;