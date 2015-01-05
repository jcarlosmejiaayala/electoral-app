(function () {
    'use strict';

    function controller($location, SweetAlert) {
        this.isCollapsed = true;
        //obtener el menu del back
        this.menu = [
            {
                name: 'Planilla',
                link: '/planilla'
            },
            {
                name: 'Ingresar',
                link: '/login'
            },
            {
                name: 'Configuración',
                link: '/configuracion'
            }
        ];
        this.isActive = function (route) {
            return (_.isEqual(route, $location.path()));
        };

        this.showLogin = function(name){
            return (_.isEqual(name, 'Ingresar'));
        };
        this.sendCredentials = function(){
        };
    }

    angular
        .module('electoralApp')
        .controller('navbarController', controller);
    controller.$inject = ['$location', 'SweetAlert'];
})();