'use strict';

var express = require('express'),
    controller = require('./candidato.controller'),
    config = require('../../config/enviroment'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.post('/',  controller.create);

module.exports = router;
