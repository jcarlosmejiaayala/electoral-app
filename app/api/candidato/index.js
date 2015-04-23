'use strict';

var express = require('express'),
    controller = require('./candidato.controller'),
    auth = require('../../auth/auth.service'),
    config = require('../../config/enviroment'),
    router = express.Router();

router.post('/', auth.checkUserExists(), controller.create);

module.exports = router;
