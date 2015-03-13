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