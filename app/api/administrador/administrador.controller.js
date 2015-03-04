'use strict';

var Administrador = require('./administrador.model'),
    config = require('../../config/enviroment'),
    errors = require('../../components/errors'),
    _ = require('lodash'),
    Promise = require('bluebird');

Promise.promisifyAll(Administrador);

exports.create = function (req, res) {
    var administrador = new Administrador(req.body);
    administrador.status = true;
    administrador.ip = req.ip;
    administrador.password = '1234';
    administrador.candidato = req.user._id;
    administrador.save(function (err, user) {
        if (err) {
            return res.json(500, {message: errors[500]});
        }
        res.status(200).end();
    });
};