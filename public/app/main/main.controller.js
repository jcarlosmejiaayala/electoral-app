(function () {
    'use strict';

    function controller(usuario) {
    }

    angular
        .module('electoralApp')
        .controller('mainController', controller);

    controller.$inject = ['usuario'];
})();