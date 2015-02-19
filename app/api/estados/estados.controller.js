'use strict';

var Estados = require('./estados.model'),
    Promise = require('bluebird'),
    _ = require('lodash'),
    errors = require('./../../components/errors');

Promise.promisifyAll(Estados);
Promise.promisifyAll(Estados.prototype);

exports.getMunicipios = function (req, res) {
    Estados
        .findOneAsync({nombre: req.params.estado}, 'municipios')
        .then(function (data) {
            if (!data || _.isEmpty(data)) {
                return req.json(400, {message: errors[400]});
            }
            res.json(200, data);
        })
        .catch(function (err) {
            return res.json(500, {message: errors[500]});
        });
};