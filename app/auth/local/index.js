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
        if (error || !user) {
            return res.json(401, {message: errors[401]});
        }
        token = auth.signToken(user._id);
        res.json({token: token});
    })(req, res, next);
});

module.exports = router;