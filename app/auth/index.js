'use strict';

var express = require('express'),
    Usuario = require('../model/usuario'),
    router = express.Router();

require('./local/passport').setup(Usuario);
router.use('/local', require('./local'));

module.exports = router;