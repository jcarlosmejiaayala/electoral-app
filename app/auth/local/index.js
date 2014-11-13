'use strict';

var express = require('express'),
    config = require('../config/enviroment'),
    passport = require('passport'),
    auth = require('../auth.service'),
    router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info,
            token;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {message: 'Usuario inexistente'});
        token = auth.signToken(use._id, user.role);
        res.json({token: token});
    })(req, res, next);
});

module.exports = router;