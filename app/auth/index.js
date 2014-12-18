'use strict';

var express = require('express'),
    usuario = require('../api/usuario/usuario.model'),
    router = express.Router();

require('./local/passport').setup(usuario);
router.use('/local', require('./local'));

module.exports = router;