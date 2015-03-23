'use strict';

var express = require('express'),
    controller = require('./simpatizante.controller'),
    config = require('../../config/enviroment'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/voto', auth.isAuthenticated(), controller.setVoto);
router.get('/:distrito', auth.isAuthenticated(), controller.getSimpatizanteDistrito);

module.exports = router;
