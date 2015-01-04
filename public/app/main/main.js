(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];

        states.push({
            name: 'home',
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'mainController',
            controllerAs: 'main'
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
            templateUrl: 'app/planilla/planilla.html'
        });

        states.push({
            name: 'resultados',
            url: '/resultados',
            templateUrl: 'app/resultado/resultado.html',
            controller: 'resultadoController',
            controllerAs: 'resultado'
        });

        states.push({
            name: 'casilla',
            url: '/casilla',
            templateUrl: 'app/casilla/casilla.html'
        });

        states.push({
            name: 'configuracion',
            url: '/configuracion',
            templateUrl: 'app/configuracion/configuracion.html',
            controller: 'configuracionController',
            controllerAs: 'config'
        });

        _.forEach(states, function (state) {
            $stateProvider.state(state);
        });
    }

    angular
        .module('electoralApp')
        .config(config);

    config.$inject = ['$stateProvider'];
})();