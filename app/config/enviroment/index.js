'use strict';

var path = require('path'),
    _ = require('lodash'),
    all;

all = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 9000,
    root: patn.normalize(_.dirname + '/../../..'),
    secrets: {
        session: 'electoral'
    },
    roles: [
        'invitado',
        'simpatizante',
        'representante de casilla',
        'representante general',
        'adminisitrador',
        'candidato',
        'root'
    ],
    mongo: {
        uri: 'mongodb://localhost/electoral',
        options: {
            safe: true
        }
    }
};

module.exports = _.merge(
    all, require('./', process.env.NODE_ENV + '.js') || {}
);