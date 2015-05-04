'use strict';

var controller = function ($scope, $state, simpatizantes, votante, SweetAlert) {
    this.simpatizantes = simpatizantes;
    this.emitirVoto = function (simpatizante) {
        SweetAlert.swal({
            title: '¿Desea confirmar el voto de ' + simpatizante.nombre + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si'
        }, function (isConfirm) {
            if (!isConfirm) {
                return $scope.$evalAsync(simpatizante.voto = false);
            }
            votante.setVoto(simpatizante._id)
                .then(function () {
                    $state.reload();
                });
        });
    };
};
angular
    .module('electoralApp')
    .controller('votosController', controller);

controller.$inject = ['$scope', '$state', 'simpatizantes', 'votante', 'SweetAlert'];