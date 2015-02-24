'use strict';

var express = require('express'),
    controller = require('./usuario.controller'),
    config = require('../../config/enviroment'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);

module.exports = router;
