'use strict';

var config = function ($stateProvider) {
    var states = [];

    states.push({
        name: 'home',
        url: '/',
        templateUrl: 'views/home/home.html',
        controller: 'homeController',
        controllerAs: 'home'
    });

    states.push({
        name: 'login',
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'loginController',
        controllerAs: 'login'
    });

    states.push({
        name: 'planilla',
        url: '/planilla',
        templateUrl: 'views/planilla/planilla.html',
        controller: 'planillaController',
        controllerAs: 'planilla',
        authenticate: true
    });

    states.push({
        name: 'resultados',
        url: '/resultados',
        templateUrl: 'views/resultados/resultados.html',
        controller: 'resultadosController',
        controllerAs: 'resultados',
        authenticate: true
    });

    states.push({
        name: 'configuracion',
        url: '/configuracion',
        templateUrl: 'views/configuracion/configuracion.html',
        controller: 'configuracionController',
        controllerAs: 'config',
        authenticate: true
    });
    states.push({
        name: 'logout',
        url: '/logout',
        controller: function($sessionStorage, $location){
            delete $sessionStorage.token;
            $location.path('/home');
        }
    });
    states.push({
        name: 'configCandidato',
        url: '/configuracion/candidato',
        templateUrl: 'views/configuracion/candidato/candidato.html',
        controller: 'configCandidatoController',
        controllerAs: 'candidato'
    });

    states.push({
        name: 'configCandidatoNuevo',
        url: '/configuracion/candidato/nuevo',
        templateUrl: 'views/configuracion/candidato/nuevo/nuevo.html',
        controller: 'configCandidatoNuevoController',
        controllerAs: 'nuevo'
    });

    states.push({
        name: 'registro',
        url: '/registro',
        templateUrl: 'views/registro/registro.html',
        controller: 'registroController',
        controllerAs: 'registro'
    });

    _.forEach(states, function (state) {
        $stateProvider.state(state);
    });
};

angular
    .module('electoralApp')
    .config(config);

config.$inject = ['$stateProvider'];