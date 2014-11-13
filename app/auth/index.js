'use strict';

var express = require('express'),
    config = require('../config/enviroment'),
    passport = require('passport'),
    usuario = require('../api/usuario/usuario.model'),
    router = express.Router();

require('./local/passport').setup(usuario, config);
router.use('/local', require('./local'));

module.exports = router;