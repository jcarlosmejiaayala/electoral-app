(function () {
    'use strict';

    function controller(){
        this.isCollapsed = true;
    }

    angular
        .module('electoralApp')
        .controller('NavbarCtrl', controller);
})();