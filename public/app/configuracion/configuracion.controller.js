(function(){
    'use strict';

    function controller(){
        this.items = [{
            name: 'Usuarios',
            link: '/configuracion/candidato'
        }];
    }
    angular
        .module('electoralApp')
        .controller('configuracionController', controller);

    controller.$inject = [];
})();