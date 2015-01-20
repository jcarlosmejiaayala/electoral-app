(function () {
    'use strict';

    function controller($location, SweetAlert) {
        this.isCollapsed = true;
        //obtener el menu del back
        this.menu = [
            {
                name: 'Inicio',
                link: '/'
            },
            {
                name: 'Planilla',
                link: '/planilla'
            },
            {
                name: 'Resultados',
                link: '/resultados'
            },
            {
                name: 'Configuración',
                link: '/configuracion'
            },
            {
                name: 'Ingresar',
                link: '/login'
            }
        ];
        this.isActive = function (route) {
            return (_.isEqual(route, $location.path()));
        };

        this.showLogin = function (name) {
            return (_.isEqual(name, 'Ingresar'));
        };
        this.sendCredentials = function () {
        };
    }

    angular
        .module('electoralApp')
        .controller('navbarController', controller);
    controller.$inject = ['$location', 'SweetAlert'];
})();