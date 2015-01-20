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

        _.forEach(states, function (state) {
            $stateProvider.state(state);
        });
    }

    angular
        .module('electoralApp')
        .config(config);

    config.$inject = ['$stateProvider'];
})();