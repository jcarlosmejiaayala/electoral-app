'use strict';

var express = require('express'),
    controller = require('./usuario.controller'),
    config = require('../../config/enviroment'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.remove);
router.get('/planilla', auth.isAuthenticated(), controller.getPlanilla);

module.exports = router;
