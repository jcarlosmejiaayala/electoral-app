'use strict';

var Candidato = require('./candidato.model'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Candidato);

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
    var candidato = new Candidato(req.body);
    candidato.rol = 'candidato';
    candidato.status = true;
    candidato.ip = req.ip;
    candidato.save(function (err, user) {
        if (err) {
            return res.json(500, {message: errors[500]});
        }
        var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
        res.json(200, {token: token});
    });
};