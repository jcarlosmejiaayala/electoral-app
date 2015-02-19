'use strict';

var express = require('express'),
    controller = require('./usuario.controller'),
    config = require('../../config/enviroment'),
    auth = require('../../auth/auth.service'),
    router = express.Router();

router.get('/', controller.index);
router.post('/',  controller.create);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
