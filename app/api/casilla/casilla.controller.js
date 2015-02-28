'use strict';

var Casilla = require('./casilla.model'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    errors = require('../../components/errors');

Promise.promisifyAll(Casilla);

exports.index = function (req, res) {
    req.query = _.mapValues(req.query, JSON.parse);
    Casilla
        .findAsync(req.query.selects, '', req.query.filters)
        .then(function (response) {
            if (!response.length) {
                return res.status(204).end();
            }
            res.json(200, response);
        }).catch(function () {
            return res.json(500, {message: errors[500]});
        })
};
