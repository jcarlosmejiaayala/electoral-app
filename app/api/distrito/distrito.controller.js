'use strict';

var Distrito = require('../../model/distrito'),
    Seccion = require('../../model/seccion'),
    Simpatizante = require('../../model/simpatizante'),
    Representante = require('../../model/representante-general'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Distrito);
Promise.promisifyAll(Seccion);
Promise.promisifyAll(Simpatizante);
Promise.promisifyAll(Representante);

function distSeccionesFromOrigin(user) {
    return ({
        candidato: user.candidato,
        distrito: (user.distrito) ? user.distrito : undefined,
        _id: user._id,
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
                seccion: {rgeneral: sentences._id}
            });
        },
        'representante de casilla': function () {
            return ({
                distrito: {
                    candidato: sentences.candidato,
                    _id: sentences.distrito
                },
                seccion: {
                    rcasilla: sentences._id
                }
            });
        },
        'simpatizante': function () {
            return ({
                distrito: {
                    candidato: sentences.candidato,
                    _id: sentences.distrito
                },
                seccion: {
                    _id: sentences.seccion
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
            });
        }).then(function (results) {
            res.json(200, results);
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
                _id: req.user.distrito
            });
        },
        'representante de casilla': function () {
            return ({
                candidato: req.user.candidato,
                _id: req.user.distrito
            });
        },
        'simpatizante': function () {
            return ({
                candidato: req.user.candidato,
                _id: req.user.distrito
            });
        }
    }[req.user.rol]();

    Distrito.findAsync(sentence, 'numero', {sort: {numero: 1}}).then(function (distritos) {
        res.json(200, distritos);
    });
};

exports.getSecciones = function (req, res) {
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
                rcasilla: req.user._id
            });
        }
    }[req.user.rol]();
    _.extend(sentence, {distrito: req.params.id});
    Seccion.findAsync(sentence, 'numero', {sort: {numero: 1}})
        .then(function (secciones) {
            if (!secciones.length) {
                return res.json(403, {message: 'No hay secciobnes'});
            }
            res.json(200, secciones);
        });
}
;

exports.getVotantesPorSeccion = function (req, res) {
    var sentence = {
        candidato: (req.user.rol == 'candidato') ? req.user._id : req.user.candidato,
        distrito: req.params.id,
        rol: 'simpatizante'
    }, isCandidato = _.includes(['administrador', 'candidato'], req.user.rol);
    if(req.user.rol == 'representante general'){
        _.extend(sentence, {
            rgeneral: req.user._id
        });
    }
    if(req.params.seccion != 'todas'){
        _.extend(sentence, {
            seccion: req.params.seccion
        });
    }
    var Promises = [Simpatizante.findAsync(_.merge(sentence, {voto: false}), 'nombre seccion rgeneral', {}).then(function (simpatizantes) {
        return Promise.map(simpatizantes, function (simpatizante) {
            return Promise.all([
                Seccion.findByIdAsync(simpatizante.seccion, 'numero'),
                Representante.findByIdAsync(simpatizante.rgeneral, 'nombre')
            ]).spread(function (seccion, rgeneral) {
                return _.extend(simpatizante._doc, {seccion: seccion.numero, rgeneral: rgeneral.nombre});
            });

        });
    }), Simpatizante.countAsync(_.extend(sentence, {
        voto: false
    })), Simpatizante.countAsync(_.extend(sentence, {
        voto: true
    }))];

    if (isCandidato) {
        Promises.push(Simpatizante.findAsync(_.merge(sentence, {voto: true}), 'nombre seccion rgeneral', {}).then(function (simpatizantes) {
            return Promise.map(simpatizantes, function (simpatizante) {
                return Promise.all([
                    Seccion.findByIdAsync(simpatizante.seccion, 'numero', {}),
                    Representante.findByIdAsync(simpatizante.rgeneral, 'nombre', {})
                ]).spread(function (seccion, rgeneral) {
                    return _.extend(simpatizante._doc, {seccion: seccion.numero, rgeneral: rgeneral.nombre});
                });
            });
        }));
    }
    Promise.all(Promises).spread(function (simpatizantesNoVotos, countNoVotos, countVotos, simpatizantesVotos) {
        var response = {
            simpatizantesNoVotos: simpatizantesNoVotos,
            countNoVotos: countNoVotos,
            countVotos: countVotos
        };
        if (isCandidato) {
            _.assign(response, {
                simpatizantesVotos: simpatizantesVotos
            });
        }
        res.json(200, response);
    });
};