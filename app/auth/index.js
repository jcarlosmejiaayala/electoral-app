'use strict';

var express = require('express'),
    Usuario = require('../api/usuario/usuario.model'),
    router = express.Router();

require('./local/passport').setup(Usuario);
router.use('/local', require('./local'));

module.exports = router;