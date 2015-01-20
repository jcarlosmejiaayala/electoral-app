(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];
        states.push({
            name: 'configCandidatoNuevo',
            url: '/configuracion/candidato/nuevo',
            templateUrl: 'app/configuracion/candidato/nuevo/nuevo.html',
            controller: 'configCandidatoNuevoController',
            controllerAs: 'nuevo'
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