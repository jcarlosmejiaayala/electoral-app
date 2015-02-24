'use strict';

var Usuario = require('./usuario.model'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Usuario);

exports.index = function (req, res) {
    Usuario
        .findAsync({}, '-salt -hashedPassword')
        .then(function (err, data) {
            if (err) {
                return res.json(500, {message: errors[500]});
            }
            if (!data) {
                return res.json(400, {message: errors[400]});
            }
            res.json(200, data);
        })
        .catch(function (err) {
            return res.json(500, {message: errors[500]});
        });
};

exports.show = function (req, res) {
    debugger;
};

exports.me = function (req, res) {
    Usuario
        .findOneAsync({_id: req.user._id}, '-salt -hashedPassword')
        .then(function (user) {
            if (!user) {
                return res.json(401, {message: errors[401]});
            }
            res.json(200, user);
        }).catch(function (err) {
            return res.json(500, {message: errors[500]});

        });
};

exports.create = function (req, res) {
    req.checkBody('telefonos.telefono', 'Número invalido').isInt();
    req.checkBody('telefonos.celular', 'Número invalido').isInt();
    req.checkBody('direccion', 'String invalido').isAscii();
    req.checkBody('email', 'Email invalido').isEmail();
    req.checkBody('password', 'Password invalido').isAscii();
    req.checkBody('redesSociales.facebook', 'String invalido').isAscii();
    req.checkBody('redesSociales.twitter', 'String invalido').isAscii();
    if (req.validationErrors() && !!req.validationErrors().length) {
        return res.json(400, {message: errors[400]});
    }
    var usuario = new Usuario(req.body);
    usuario.rol = 'candidato';
    usuario.status = true;
    usuario.ip = req.ip;
    usuario.save(function (err, user) {
        if (err) {
            return res.json(500, {message: errors[500]});
        }
        var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
        res.json(200, {token: token});
    });
};

exports.update = function (req, res) {

};

exports.destroy = function (req, res) {

};