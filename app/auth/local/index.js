'use strict';

var express = require('express'),
    config = require('../../config/enviroment'),
    passport = require('passport'),
    auth = require('../auth.service'),
    errors = require('../../components/errors'),
    router = express.Router();

router.post('/', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        var error = err || info,
            token;
        if (error) {
            return res.json(401, {message: errors[401]});
        }
        if (!user) {
            return res.json(404, {message: errors[404]});
        }
        token = auth.signToken(user._id);
        res.json({token: token, perfil: user.perfil});
    })(req, res, next);
});

module.exports = router;