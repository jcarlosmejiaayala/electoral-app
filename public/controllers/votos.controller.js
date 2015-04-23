'use strict';

var controller = function ($state, simpatizantes, votante) {
    this.simpatizantes = simpatizantes;
    this.emitirVoto = function (simpatizante) {
        votante.setVoto(simpatizante._id)
            .then(function () {
                $state.reload();
            });
    };
};
angular
    .module('electoralApp')
    .controller('votosController', controller);

controller.$inject = ['$state', 'simpatizantes', 'votante'];