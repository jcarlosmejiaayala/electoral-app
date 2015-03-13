'use strict';

var config = function ($stateProvider) {
    var states = [];

    states.push({
        name: 'home',
        url: '/',
        templateUrl: 'views/home/home.html'
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
        templateUrl: 'views/simpatizantes/index.html',
        controller: 'simpatizantesController as simpatizante',
        authenticate: true
    });

    states.push({
        name: 'simpatizantesNuevo',
        url: '/simpatizantes/nuevo',
        templateUrl: 'views/simpatizantes/nuevo.html',
        controller: 'simpatizantesNuevoController as simpatizante',
        authenticate: true,
        resolve: {
            user: function ($q, usuario, distrito) {
                return $q.all([usuario.get(), distrito.getDistritoAndSecciones()])
                    .then(function (results) {
                        return ({
                            me: results[0],
                            distSecciones: results[1]
                        });
                    });
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