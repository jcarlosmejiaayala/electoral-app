'use strict';

var config = function ($stateProvider) {
    var states = [];

    states.push({
        name: 'home',
        url: '/',
        templateUrl: 'views/home/home.html',
        controller: 'homeController as home'
    });

    states.push({
        name: 'login',
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'loginController as login'
    });

    states.push({
        name: 'simpatizantes',
        url: '/simpatizantes',
        templateUrl: 'views/simpatizantes/simpatizantes.html',
        controller: 'simpatizantesController as simpatizante',
        authenticate: true
    });

    states.push({
        name: 'simpatizantesNuevo',
        url: '/simpatizantes/nuevo',
        templateUrl: 'views/simpatizantes/simpatizantes.nuevo.html',
        controller: 'simpatizantesNuevoController as simpatizante',
        authenticate: true,
        resolve: {
            user: function (usuario) {
                return usuario.get();
            }
        }
    });

    states.push({
        name: 'resultados',
        url: '/resultados',
        templateUrl: 'views/resultados/resultados.html',
        controller: 'resultadosController as resultados',
        authenticate: true
    });

    states.push({
        name: 'configuracion',
        url: '/configuracion',
        templateUrl: 'views/configuracion/configuracion.html',
        controller: 'configuracionController as config',
        authenticate: true
    });

    states.push({
        name: 'registro',
        url: '/registro',
        templateUrl: 'views/registro/registro.html',
        controller: 'registroController as registro'
    });

    states.push({
        name: 'logout',
        url: '/logout',
        controller: function ($location, usuario) {
            usuario.logout();
            $location.path('/home');
        }
    });

    _.forEach(states, function (state) {
        $stateProvider.state(state);
    });
};

angular
    .module('electoralApp')
    .config(config);

config.$inject = ['$stateProvider'];