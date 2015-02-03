'use strict';

var config = function ($stateProvider) {
    var states = [];

    states.push({
        name: 'home',
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'homeController',
        controllerAs: 'home'
    });

    states.push({
        name: 'login',
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'loginController',
        controllerAs: 'login'
    });

    states.push({
        name: 'planilla',
        url: '/planilla',
        templateUrl: 'app/planilla/planilla.html',
        controller: 'planillaController',
        controllerAs: 'planilla'
    });

    states.push({
        name: 'resultados',
        url: '/resultados',
        templateUrl: 'app/resultados/resultados.html',
        controller: 'resultadosController',
        controllerAs: 'resultados'
    });

    states.push({
        name: 'configuracion',
        url: '/configuracion',
        templateUrl: 'app/configuracion/configuracion.html',
        controller: 'configuracionController',
        controllerAs: 'config'
    });

    states.push({
        name: 'configCandidato',
        url: '/configuracion/candidato',
        templateUrl: 'app/configuracion/candidato/candidato.html',
        controller: 'configCandidatoController',
        controllerAs: 'candidato',
        resolve: {
            candidatos: function (usuario) {
                return usuario.query(function (err, data) {
                    if (data) {
                        return data;
                    }
                });
            }
        }
    });

    states.push({
        name: 'configCandidatoNuevo',
        url: '/configuracion/candidato/nuevo',
        templateUrl: 'app/configuracion/candidato/nuevo/nuevo.html',
        controller: 'configCandidatoNuevoController',
        controllerAs: 'nuevo'
    });

    states.push({
        name: 'cuentaCrear',
        url: '/cuenta/crear',
        templateUrl: 'app/cuenta/crear/crear.html',
        controller: 'crearController',
        controllerAs: 'crear'
    });

    _.forEach(states, function (state) {
        $stateProvider.state(state);
    });
};

angular
    .module('electoralApp')
    .config(config);

config.$inject = ['$stateProvider'];