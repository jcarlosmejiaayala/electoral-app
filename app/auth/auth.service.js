'use strict';

var config = require('../config/enviroment'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    compose = require('composable-middleware'),
    Usuario = require('../api/usuario/usuario.model'),
    _ = require('lodash'),
    errors = require('../components/errors'),
    Promise = require('bluebird'),
    validateJwt = expressJwt({secret: config.secrets.session});
Promise.promisifyAll(Usuario);

exports.isAuthenticated = function () {
    return compose()
        .use(function (req, res, next) {
            if (req.query && _.has(req.query, 'access_token')) {
                req.headers.authorization = 'Bearer ' + req.query['access_token'];
            }
            validateJwt(req, res, next);
        })
        .use(function (req, res, next) {
            Usuario
                .findByIdAsync(req.user._id)
                .then(function (user) {
                    if (!user) return res.json(403, {message: errors[401]});
                    req.user = user;
                    next();
                }).catch(function (err) {
                    next(err);
                });
        });
};

exports.hasRole = function (roleRequired) {
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
};

exports.signToken = function (id) {
    return jwt.sign({_id: id}, config.secrets.session, {expires: 60 * 5});
};

exports.setTokenCookie = function (req, res) {
    if (!req.user) return res.json(404, {message: 'Intentelo de nuevo'});
    var token = signToken(req.user._id);
    res.cookie('token', JSON.stringify(token));
    res.redirect('/');
};