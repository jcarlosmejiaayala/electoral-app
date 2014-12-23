(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];
        states.push({
            name: 'casilla',
            url: '/casilla',
            templateUrl: 'app/casilla/casilla.html'
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