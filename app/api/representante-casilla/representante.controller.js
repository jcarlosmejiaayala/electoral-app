'use strict';

var Representante = require('../../model/representante-casilla'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Representante);

exports.create = function (req, res) {
    var representante = new Representante(req.body);
    representante.status = true;
    representante.ip = req.ip;
    representante.password = '1234';
    representante.partido = req.user.partido;
    representante.candidato = req.body.candidato;
    representante.distrito = req.body.distrito;
    representante.rgeneral = req.body.rgeneral;
    representante.seccion = req.body.seccion;
    representante.save(function (err) {
        if (err) {
            return res.json(500, {message: errors[500]});
        }
        res.status(200).end();
    });
};