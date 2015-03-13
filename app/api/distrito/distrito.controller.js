'use strict';

var Distrito = require('../../model/distrito'),
    Seccion = require('../../model/seccion'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Distrito);
Promise.promisifyAll(Seccion);

exports.index = function (req, res) {

};

exports.getDistristrosAndSecciones = function (req, res) {

    var sentence = {
        'candidato': function () {
            return ({
                distrito: {
                    candidato: req.user._id
                },
                seccion: {}
            });
        },
        'administrador': function () {
            return ({
                distrito: {
                    candidato: req.user.candidato
                },
                seccion: {}
            });
        },
        'representante general': function () {
            return ({
                distrito: {
                    candidato: req.user.candidato,
                    _id: req.user.distrito
                },
                seccion: {_id: {$in: req.user.secciones}}
            });
        },
        'representante de casilla': function () {
            return ({
                distrito: {
                    candidato: req.user.candidato,
                    _id: req.user.distrito
                },
                seccion: {
                    seccion: req.user.seccion
                }
            });
        }
    }[req.user.rol]();
    Distrito.findAsync(sentence.distrito)
        .then(function (distritos) {
            return Promise.map(distritos, function (distrito) {
                return Seccion.findAsync(_.merge({distrito: distrito._id}, sentence.seccion)).then(function (secciones) {
                    return ({distrito: distrito, secciones: secciones});
                });
            })
        }).then(function (results) {
            res.json(200, results);
        });
};