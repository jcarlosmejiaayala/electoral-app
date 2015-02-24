'use strict';

var path = require('path'),
    _ = require('lodash'),
    all;

all = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 9000,
    root: path.normalize(__dirname + '/../../..'),
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
    menu: [
        {
            name: 'Ingresar',
            link: '/login'
        },
        {
            name: 'resultados',
            link: '/resultados'
        },
        {
            name: 'planilla',
            link: '/planilla'
        },
        {
            name: 'configuracion',
            link: '/configuracion'
        },
        {
            name: 'salir',
            link: '/logout'
        }]
};


module.exports = _.merge(
    all, require('./' + process.env.NODE_ENV + '.js')
);