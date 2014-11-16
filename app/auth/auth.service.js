'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('../config/enviroment'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    compose = require('composable-middleware'),
    user = require('../api/usuario/usuario.model'),
    _ = require('lodash'),
    validateJwt = expressJwt({secret: config.secrets.session});

function isAuthenticated() {
    return compose()
        .use(function (req, res, next) {
            if (req.query && _.has(req.query, 'access_token'))
                req.headers.authorization = 'Bearer ' + req.query['access_token'];
            validateJwt(req, res, next);
        })
        .use(function (req, res, next) {
            user.findById(req.user._id, function (err, user) {
                if (err) return next(err);
                if (!user) return res.send(401);
                req.user = user;
                next();
            });
        });
}

function hasRole(roleRequired) {
    if (!roleRequired) throw new Error('Requiere ingresar un rol');
    return compose()
        .use(isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (_.indexOf(config.roles, req.user.role) >= _.indexOf(config.roles, roleRequired))
                next();
            else {
                res.send(403);
            }
        });
}

function signToken(id) {
    return jwt.sign({_id: id}, config.secrets.session, {expires: 60 * 5});
}

function setTokenCookie(req, res) {
    if (!req.user) return res.json(404, {message: 'Intentelo de nuevo'});
    var token = signToken(req.user._id);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;