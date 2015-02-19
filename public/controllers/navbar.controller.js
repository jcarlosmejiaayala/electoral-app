'use strict';

var controller = function ($location, usuario) {
    this.isCollapsed = true;
    /*
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
     */
    this.menu = (function () {
        if (!usuario.isLoggedIn()) {
            return ([{
                name: 'Ingresar',
                link: '/login'
            }])
        }
    })();
    this.isActive = function (route) {
        return (_.isEqual(route, $location.path()));
    };

    this.showLogin = function (name) {
        return (_.isEqual(name, 'Ingresar'));
    };
    this.sendCredentials = function () {
    };
};

angular
    .module('electoralApp')
    .controller('navbarController', controller);
controller.$inject = ['$location', 'usuario'];