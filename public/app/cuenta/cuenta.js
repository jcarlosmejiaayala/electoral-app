(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];
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
    }

    angular
        .module('electoralApp')
        .config(config);
    config.$inject = ['$stateProvider'];
})();