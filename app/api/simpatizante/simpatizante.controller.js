'use strict';

var Simpatizante = require('../../model/simpatizante'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Simpatizante);

exports.create = function (req, res) {
    var simpatizante = new Simpatizante(req.body);
    simpatizante.status = true;
    simpatizante.ip = req.ip;
    simpatizante.partido = req.user.partido;
    simpatizante.candidato = req.body.candidato;
    simpatizante.distrito = req.body.distrito;
    simpatizante.rgeneral = req.body.rgeneral;
    simpatizante.rcasilla = req.body.rcasilla;
    simpatizante.seccion = req.body.seccion;
    simpatizante.save(function (err) {
        if (err) {
            return res.json(500, {message: errors[500]});
        }
        res.status(200).end();
    });
};

exports.setVoto = function (req, res) {
    Simpatizante.updateAsync({_id: req.body.params.id}, {$set: {voto: true}})
        .then(function () {
            res.status(200).end();
        })
        .catch(function (err) {
            res.status(202).end();
        });
};

exports.index = function (req, res) {
    var sentence = {
        'candidato': function () {
            return ({
                candidato: req.user._id
            });
        },
        'administrador': function () {
            return ({
                candidato: req.user.candidato
            });
        },
        'representante general': function () {
            return ({
                candidato: req.user.candidato,
                rgeneral: req.user._id
            });
        },
        'representante de casilla': function () {
            return ({
                candidato: req.user.candidato,
                rgeneral: req.user.rgeneral,
                rcasilla: req.user._id
            });
        }
    }[req.user.rol]();
    Simpatizante.findAsync(_.merge(sentence, {rol: 'simpatizante'})).then(function (users) {
        res.json(200, users);
    });
};