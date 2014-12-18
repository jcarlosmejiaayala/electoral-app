(function () {
    'use strict';

    function controller($mdSidenav, auth) {
        this.displayMenu = function () {
            $mdSidenav('menu').toggle();
        };

        this.isLoggedIn = function(){
            return false;
        };
    }

    angular
        .module('electoralApp')
        .controller('navbarController', controller);
    controller.$inject = ['$mdSidenav', 'auth'];
})();