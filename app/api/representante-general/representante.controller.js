'use strict';

var Representante = require('../../model/representante-general'),
    Seccion = require('../../model/seccion'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Representante);
Promise.promisifyAll(Seccion);

exports.create = function (req, res) {
    Seccion.findAsync({_id: {$in: req.body.distSecciones.secciones}, rgeneral: {$exists: true}}, 'numero')
        .then(function (secciones) {
            if (secciones.length) {
                return res.json(403, {
                    message: secciones.map(function (seccion) {
                        return seccion.numero;
                    })
                });
            }
            var representante = new Representante(req.body);
            representante.status = true;
            representante.ip = req.ip;
            representante.password = '1234';
            representante.partido = req.user.partido;
            representante.candidato = req.body.candidato;
            representante.distrito = req.body.distSecciones.distrito;
            representante.save(function (err, user) {
                if (err) {
                    return res.json(500, {message: errors[500]});
                }
                Seccion.updateAsync({_id: {$in: req.body.distSecciones.secciones}}, {$set: {rgeneral: user._id}}, {multi: true})
                    .then(function () {
                        res.status(200).end();
                    });
            });
        });
};