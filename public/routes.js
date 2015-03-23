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
        authenticate: true,
        resolve: {
            simpatizantes: function (usuario) {
                return usuario.getPlanilla();
            }
        }
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
        name: 'conteo',
        url: '/conteo',
        templateUrl: 'views/conteo/conteo.html',
        controller: 'conteoController as conteo',
        authenticate: true,
        resolve: {
            distritos: function (distrito) {
                return (distrito.get());
            }
        }
    });

    states.push({
        name: 'configuracion',
        url: '/configuracion',
        templateUrl: 'views/configuracion/configuracion.html',
        controller: 'configuracionController as config',
        authenticate: true,
        resolve: {
            me: function (usuario) {
                return usuario.get();
            }
        }
    });

    states.push({
        name: 'registro',
        url: '/registro',
        templateUrl: 'views/registro/registro.html',
        controller: 'registroController as registro'
    });
    states.push({
        name: 'votos',
        url: '/votos',
        templateUrl: 'views/votos/votos.html',
        controller: 'votosController as voto',
        resolve: {
            simpatizantes: function (usuario) {
                return usuario.getPlanilla();
            }
        }
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