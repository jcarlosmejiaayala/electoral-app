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
        .use(function(req, res, next){
            if(req.query && _.has(req.query, 'access_token')) {
                req.
            }
        })
}

function hasRole() {

}

function signToken() {

}

function setTokenCookie() {

}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;