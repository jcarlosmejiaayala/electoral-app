(function(){
    'use strict';

    function controller($scope){
        this.menu = {};
        this.isCollapsed = true;
        this.toggleNavigation = function(){
            this.isCollapsed = !this.isCollapsed;
        };
    }
    angular
        .module('electoralApp')
        .controller('NavbarCtrl', controller);
})();