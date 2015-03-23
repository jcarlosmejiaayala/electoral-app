'use strict';

var express = require('express'),
    auth = require('../../auth/auth.service'),
    controller = require('./distrito.controller'),
    router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/secciones', auth.isAuthenticated(), controller.getDistristrosAndSecciones);

module.exports = router;