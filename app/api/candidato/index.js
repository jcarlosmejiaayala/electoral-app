'use strict';

var express = require('express'),
    controller = require('./candidato.controller'),
    config = require('../../config/enviroment'),
    router = express.Router();

router.post('/',  controller.create);

module.exports = router;
