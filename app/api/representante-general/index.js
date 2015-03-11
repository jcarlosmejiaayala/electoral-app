'use strict';

var express = require('express'),
    controller = require('./representante.controller'),
    config = require('../../config/enviroment'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;
