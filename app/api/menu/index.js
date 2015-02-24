'use strict';

var express = require('express'),
    auth = require('../../auth/auth.service'),
    controller = require('./menu.controller'),
    router = express.Router();

router.get('/', auth.securityMenu(), controller.index);

module.exports = router;