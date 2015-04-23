'use strict';

var express = require('express'),
    auth = require('../../auth/auth.service'),
    controller = require('./distrito.controller'),
    router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/secciones', auth.isAuthenticated(), controller.getDistristrosAndSecciones);
router.get('/:id', auth.isAuthenticated(), controller.getSecciones);
router.get('/:id/:seccion', auth.isAuthenticated(), controller.getVotantesPorSeccion);

module.exports = router;