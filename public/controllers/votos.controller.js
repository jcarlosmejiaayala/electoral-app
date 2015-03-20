'use strict';

var controller = function (simpatizantes, votante) {
    this.simpatizantes = simpatizantes;
    this.emitirVoto = function (simpatizante) {
        votante.setVoto(simpatizante._id)
            .then(function (response) {
                debugger;
            });
    };
};
angular
    .module('electoralApp')
    .controller('votosController', controller);

controller.$inject = ['simpatizantes', 'votante'];