(function () {
    'use strict';

    function config($stateProvider) {
        var states = [];
        states.push({
            name: 'home',
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'mainCtrl',
            controllerAs: 'main'
        });

        states.push({
            name: 'login',
            url: '/login',
            templateUrl: 'app/account/login/login.html',
            controller: 'loginCtrl',
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