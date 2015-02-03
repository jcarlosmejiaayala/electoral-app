(function () {
    'use strict';

    function controller(usuario) {
    }

    angular
        .module('electoralApp')
        .controller('homeController', controller);

    controller.$inject = ['usuario'];
})();