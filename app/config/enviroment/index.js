'use strict';

var path = require('path'),
    _ = require('lodash'),
    all;

all = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    root: path.normalize(__dirname + '/../../..'),
    secrets: {
        session: 'electoral'
    },
    roles: [
        'simpatizante',
        'representante de casilla',
        'representante general',
        'adminisitrador',
        'candidato',
        'root'
    ],
    menu: [
        {
            name: 'Ingresar',
            link: '/login'
        },
        {
            name: 'Resultados',
            link: '/resultados'
        },
        {
            name: 'Simpatizantes',
            link: '/simpatizantes'
        },
        {
            name: 'Configuración',
            link: '/configuracion'
        },
        {
            name: 'Salir',
            link: '/logout'
        }]
};


module.exports = _.merge(
    all, require('./' + process.env.NODE_ENV + '.js')
);