'use strict';

var Estados = require('./estados.model'),
    Promise = require('bluebird'),
    NodeCache = require('node-cache'),
    _ = require('lodash'),
    errors = require('./../../components/errors'),
    cache = new NodeCache({checkperiod: 60 * 60 * 24});
Promise.promisifyAll(Estados);
Promise.promisifyAll(Estados.prototype);
Promise.promisifyAll(cache);

exports.index = function (req, res) {
    Estados
        .findAsync({}, 'nombre')
        .then(function (data) {
            if (!data) {
                req.json(204, {message: errors[204]});
            }
            if (_.isEmpty(cache.get('estados'))) {
                cache.set('estados', data);
            }
            cache
                .getAsync('estados')
                .then(function (value) {
                    res.json(200, value);
                })
                .catch(function (err) {
                    res.json(500, {message: errors[500]});
                });
        })
        .catch(function (err) {
            res.json(500, {message: errors[500]});
        });
};