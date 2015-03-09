'use strict';

var Candidato = require('./candidato.model'),
    Casilla = require('../casilla/casilla.model'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Candidato);
Promise.promisifyAll(Casilla);

function getSecciones(candidato) {
    return new Promise(function (resolve) {
        if (!candidato.distrito) {
            var ubicacion = {};
            if (candidato.estado) {
                ubicacion.estado = candidato.estado;
            }
            if (candidato.municipio) {
                ubicacion.municipio = candidato.municipio;
            }
            Casilla.aggregateAsync([
                {$match: ubicacion},
                {$group: {_id: '$distrito', secciones: {$push: '$seccion'}}}
            ]).then(function (data) {
                resolve(_.transform(data, function (result, object) {
                    return result.push({numero: object._id, secciones: object.secciones});
                }));
            });
        }
        else {
            resolve({
                numero: candidato.distrito.numero,
                secciones: _.range(candidato.distrito.secciones.min, candidato.distrito.secciones.max)
            });
        }
    });
}

exports.create = function (req, res) {
    getSecciones(req.body).then(function (distritos) {
        var candidato = new Candidato(req.body);
        candidato.distrito = distritos;
        candidato.status = true;
        candidato.ip = req.ip;
        candidato.save(function (err, user) {
            if (err) {
                return res.json(500, {message: errors[500]});
            }
            var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
            res.json(200, {token: token, perfil: user.perfil});
        });
    });
};