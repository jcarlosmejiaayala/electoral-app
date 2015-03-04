'use strict';

var controller = function () {
    this.simpatizantes = [{
        nombre: 'Aurora',
        rol: 'administrador'
    },
        {
            nombre: 'Luis',
            rol: 'representate general'
        }];

};

angular
    .module('electoralApp')
    .controller('simpatizantesController', controller);

controller.$inject = [];

