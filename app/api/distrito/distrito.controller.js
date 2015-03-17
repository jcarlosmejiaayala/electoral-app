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
function distSeccionesFromOrigin(user) {
    return ({
        candidato: user.candidato,
        distrito: (user.distrito) ? user.distrito : undefined,
        secciones: (user.secciones) ? user.secciones : undefined,
        seccion: (user.seccion) ? user.seccion : undefined,
        rol: user.rol
    });
}
exports.getDistristrosAndSecciones = function (req, res) {
    var sentences = (!req.query.simpatizante) ? distSeccionesFromOrigin(req.user) : distSeccionesFromOrigin(JSON.parse(req.query.simpatizante));
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
                    candidato: sentences.candidato
                },
                seccion: {}
            });
        },
        'representante general': function () {
            return ({
                distrito: {
                    candidato: sentences.candidato,
                    _id: sentences.distrito
                },
                seccion: {_id: {$in: sentences.secciones}}
            });
        },
        'representante de casilla': function () {
            return ({
                distrito: {
                    candidato: sentences.candidato,
                    _id: sentences.distrito
                },
                seccion: {
                    seccion: sentences.seccion
                }
            });
        }
    }[sentences.rol]();
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