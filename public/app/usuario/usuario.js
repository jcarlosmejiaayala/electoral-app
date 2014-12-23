(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];

        states.push({
            name: 'usuario',
            url: '/usuario',
            templateUrl: 'app/usuario/usuario.html'
        });

        _.forEach(states, function (state) {
            $stateProvider.state(state);
        })
    }

    angular
        .module('electoralApp')
        .config(config);
    config.$inject = ['$stateProvider'];
})();