'use strict';

var Estados = require('./estados.model'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    errors = require('./../../components/errors');

Promise.promisifyAll(Estados);

exports.index = function (req, res) {
    Estados
        .findOneAsync(req.query, 'municipios')
        .then(function (data) {
            if (_.isEmpty(data)) {
                return res.status(204).end();
            }
            res.json(200, data);
        })
        .catch(function () {
            return res.json(500, {message: errors[500]});
        });
};