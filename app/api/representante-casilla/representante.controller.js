'use strict';

var Representante = require('../../model/representante-casilla'),
    Seccion = require('../../model/seccion'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Representante);
Promise.promisifyAll(Seccion);

exports.create = function (req, res) {
    Seccion.findOneAsync({_id: req.body.seccion, rcasilla: {$exists: true}}, 'numero')
        .then(function (seccion) {
            if (seccion) {
                return res.json(403, {message: [seccion.numero]});
            }
            var representante = new Representante(req.body);
            representante.status = true;
            representante.ip = req.ip;
            representante.password = '1234';
            representante.partido = req.user.partido;
            representante.candidato = req.body.candidato;
            representante.distrito = req.body.distrito;
            representante.rgeneral = req.body.rgeneral;
            representante.save(function (err, user) {
                if (err) {
                    return res.json(500, {message: errors[500]});
                }
                Seccion.updateAsync({_id: req.body.seccion}, {$set: {rcasilla: user._id}})
                    .then(function () {
                        res.status(200).end();
                    });
            });
        });
};