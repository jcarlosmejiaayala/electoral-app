(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];
        states.push({
            name: 'main',
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        });

        states.push({
            name: 'login',
            url: '/login',
            templateUrl: 'app/account/loggin/loggin.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        });

        _.forEach(states, function (state) {
            $stateProvider.state(state);
        });
    }

    angular
        .module('electoralApp')
        .config(config);
})();