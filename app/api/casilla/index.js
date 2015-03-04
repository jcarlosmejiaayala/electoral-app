'use strict';

var express = require('express'),
    controller = require('./casilla.controller'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/', controller.index);
router.get('/candidato', auth.isAuthenticated(), controller.getForCandidato);
router.get('/secciones', controller.getSecciones);

module.exports = router;