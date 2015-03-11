'use strict';

var Casilla = require('../../model/casilla'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    errors = require('../../components/errors'),
    join = Promise.join;

Promise.promisifyAll(Casilla);

exports.index = function (req, res) {
    req.query = _.mapValues(req.query, JSON.parse);
    join(Casilla.findAsync(req.query.selects, '', req.query.filters), Casilla.countAsync(req.query.selects), function (casillas, total) {
        if (!casillas.length) {
            return res.status(204).end();
        }
        res.json(200, {casillas: casillas, total: total});
    }).catch(function () {
        return res.json(500, {message: errors[500]});
    })
};

exports.getForCandidato = function (req, res) {
    var sentence;
    if (_.isEqual(req.user.rol, 'candidato')) {
        sentence = {
            'Alcaldia': function () {
                return ({
                    estado: req.user.estado,
                    municipio: req.user.municipio
                });
            },
            'Gubernatura': function () {
                return ({
                    estado: req.user.estado
                });
            },
            'Presidencia Nacional': function () {
                return ({});
            },
            'Diputación Local': function () {
                return ({
                    distrito: req.user.distrito.numero
                });
            },
            'Diputación Federal': function () {
                return ({
                    distrito: req.user.distrito.numero
                });
            }
        }[req.user.candidatura]();
    }
    Casilla.distinctAsync('distrito', sentence)
        .then(function (distritos) {
            res.json(200, {
                distritos: _.sortBy(distritos),
                user: req.user
            });
        }).catch(function () {
            return res.json(500, {message: errors[500]});
        });
};

exports.getSecciones = function (req, res) {
    Casilla.distinctAsync('seccion', req.query)
        .then(function (response) {
            if (!response.length) {
                res.status(204).end();
            }
            res.json(200, _.sortBy(response));
        })
};