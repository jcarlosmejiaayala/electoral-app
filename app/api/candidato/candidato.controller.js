'use strict';

var Candidato = require('./candidato.model'),
    Casilla = require('../casilla/casilla.model'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Candidato);

exports.create = function (req, res) {
    var candidato = new Candidato(req.body);
    candidato.status = true;
    candidato.ip = req.ip;
    if(!candidato.secciones){
        debugger;
    }
    candidato.save(function (err, user) {
        if (err) {
            return res.json(500, {message: errors[500]});
        }
        var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
        res.json(200, {token: token, perfil: user.perfil});
    });
};