(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];
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

        _.forEach(states, function (state) {
            $stateProvider.state(state);
        });
    }

    angular
        .module('electoralApp')
        .config(config);
    config.$inject = ['$stateProvider'];
})();