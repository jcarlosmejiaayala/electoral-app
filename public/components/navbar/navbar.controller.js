(function () {
    'use strict';

    function controller($mdSidenav) {
        this.displayMenu = function(){
            $mdSidenav('menu').toggle();
        };
    }
    angular
        .module('electoralApp')
        .controller('navbarController', controller);
    controller.$inject = ['$mdSidenav'];
})();