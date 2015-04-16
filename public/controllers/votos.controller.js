'use strict';

var controller = function (simpatizantes, votante) {
    this.simpatizantes = simpatizantes;
    this.emitirVoto = function (simpatizante) {
        votante.setVoto(simpatizante._id)
            .then(function () {
                $location.reload();
            });
    };
};
angular
    .module('electoralApp')
    .controller('votosController', controller);

controller.$inject = ['$location', 'simpatizantes', 'votante'];