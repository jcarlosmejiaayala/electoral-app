'use strict';


var express = require('express'),
    controller = require('./usuarios.controller'),
    config = require('../config/enviroment'),
    auth = require('../auth/auth.service'),
    router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
