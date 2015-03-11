'use strict';

var Representante = require('../../model/representante-general'),
    Candidato = require('../../model/candidato'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Representante);

exports.create = function (req, res) {
    req.query.secciones = _.transform(_.range(req.body.distrito.secciones.min, req.body.distrito.secciones.max), function (result, item) {
        return result.push({numero: item});
    });
    var idCandidato = (!_.isEqual(req.user.rol, 'candidato')) ? req.user.candidato : req.user._id;
    var representante = new Representante(req.body);
    representante.status = true;
    representante.ip = req.ip;
    representante.password = '1234';
    representante.candidato = req.user._id;
    representante.partido = req.user.partido;
    representante.save(function (err) {
        if (err) {
            return res.json(500, {message: errors[500]});
        }
        res.status(200).end();
    });
};