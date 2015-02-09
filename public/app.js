'use strict';
var config,
    factory,
    run;
config = function ($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    //$httpProvider.interceptors.push('authInterceptor');
};

factory = function ($sessionStorage, $q, $location) {
    var interceptor = {};
    interceptor.request = function (config) {
        config.headers = config.headers || {};
        if ($sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
        }
        return config;
    };

    interceptor.responseError = function (response) {
        if (response.status == 401) {
            $location.path('/login');
            delete $sessionStorage.token;
            return $q.reject(response);
        }
    };
    return {
        request: interceptor.request,
        responseError: interceptor.responseError
    }
};
run = function ($rootScope, $location, auth) {
};
angular
    .module('electoralApp', [
        'ngResource',
        'ngStorage',
        'ngTouch',
        'btford.socket-io',
        'ui.router',
        'highcharts-ng',
        'ui.bootstrap',
        'oitozero.ngSweetAlert'
    ])
    .config(config)
    .factory('authInterceptor', factory)
    .run(run);