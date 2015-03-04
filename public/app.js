'use strict';
var config,
    factory,
    run,
    estados,
    candidaturas,
    partidos;
config = function ($urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
};

factory = function ($sessionStorage, $q, $location) {
    function request(config) {
        config.headers = config.headers || {};
        if ($sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $sessionStorage.token;
        }
        return config;
    }

    function responseError(response) {
        if (response.status == 401) {
            $location.path('/login');
            delete $sessionStorage.token;
            return $q.reject(response);
        }
    }

    return ({
        request: request,
        responseError: responseError
    });
};
run = function ($rootScope, $location, $log, usuario) {
    angular.extend($rootScope, {$log: $log});
    $rootScope.$on('$stateChangeStart', function (event, next) {
        usuario.isLoggin(function (loggedIn) {
            if (next.authenticate && !loggedIn) {
                $location.path('/login');
            }
            if (_.isEqual(next.name, 'home') && loggedIn) {
                $location.path('/resultados');
            }
        });
    });
};
estados = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Coahuila", "Colima", "Distrito Federal", "Nayarit", "Chiapas", "Chihuahua", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Estado De Mexico", "Michoacan", "Morelos", "Nuevo Leon", "Oaxaca", "Puebla", "Queretaro", "Quintana Roo", "San Luis Potosi", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Zacatecas", "Veracruz", "Yucatan"];
partidos = ['pri', 'pan', 'prd', 'pt', 'morena', 'ind', 'pve', 'mc', 'panal'];
candidaturas = ['Alcaldia', 'Diputación Local', 'Diputación Federal', 'Gubernatura', 'Presidencia Nacional'];


angular
    .module('electoralApp', [
        'ngResource',
        'ngStorage',
        'ngTouch',
        'ngMessages',
        'btford.socket-io',
        'ui.router',
        'highcharts-ng',
        'ui.bootstrap',
        'oitozero.ngSweetAlert',
        'ui.utils',
        'infinite-scroll',
        'ngTagsInput'
    ])
    .config(config)
    .factory('authInterceptor', factory)
    .run(run)
    .value('ESTADOS', estados)
    .value('CANDIDATURAS', candidaturas)
    .value('PARTIDOS', partidos);