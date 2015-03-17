'use strict';

var config = require('../config/enviroment'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    compose = require('composable-middleware'),
    Usuario = require('../model/usuario'),
    _ = require('lodash'),
    errors = require('../components/errors'),
    Promise = require('bluebird'),
    validateJwt = expressJwt({secret: config.secrets.session});
Promise.promisifyAll(Usuario);

function isAuthenticated() {
    return compose()
        .use(function (req, res, next) {
            if (req.query && _.has(req.query, 'access_token')) {
                req.headers.authorization = 'Bearer ' + req.query['access_token'];
            }
            validateJwt(req, res, next);
        })
        .use(function(req, res, next) {
            Usuario
                .findByIdAsync(req.user._id)
                .then(function (user) {
                    if (!user) return res.json(401, {message: errors[401]});
                    req.user = user;
                    next();
                }).catch(function (err) {
                    next(err);
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

function securityMenu() {
    return compose()
        .use(function (req, res, next) {
            if (req.query && _.has(req.query, 'access_token')) {
                req.headers.authorization = 'Bearer ' + req.query['access_token'];
            }
            validateJwt(req, res, next);
        }).use(function (err, req, res, next) {
                req.menu = _.filter(config.menu, {name: 'Ingresar'});
                next();
        }).use(function(req, res, next){
            if(!req.menu){
                Usuario
                    .findByIdAsync(req.user._id)
                    .then(function (user) {
                        req.menu = _.reject(config.menu, {name: 'Ingresar'});
                        if(!_.isEqual(user.rol, 'representante de casilla')){
                            req.menu = _.reject(req.menu, {name: 'Votos'});
                        }
                        next();
                    });
            }else{
                next();
            }
        });
}
function signToken(id) {
    return jwt.sign({ _id: id }, config.secrets.session, { expiresInMinutes: 60*5 });
}
exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.securityMenu = securityMenu;
exports.signToken = signToken;