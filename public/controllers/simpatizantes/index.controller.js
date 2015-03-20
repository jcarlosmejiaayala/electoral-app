'use strict';

var controller = function ($modal, $state, simpatizantes, SweetAlert, usuario, distrito) {
    var that = this;
    this.simpatizantes = simpatizantes;
    this.roles = _.pluck(simpatizantes, 'rol');
    this.getDetalles = function (simpatizante) {
        $modal.open({
            templateUrl: 'detalles.html',
            controller: detallesController,
            controllerAs: 'simpatizante',
            resolve: {
                simpatizante: function () {
                    return (simpatizante);
                },
                distSecciones: function () {
                    return (distrito.getDistritoAndSecciones(simpatizante));
                }
            }
        });
    };
    this.delete = function (simpatizante) {
        SweetAlert.swal({
            title: 'Se eliminara todo registro de ' + simpatizante.nombre + ', ¿Desea continuar?',
            type: "warning",
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }, function () {
            usuario.remove({id: simpatizante._id})
                .then(function () {
                    SweetAlert.swal({
                        title: 'El simpatizante fue eliminado con éxito.',
                        type: 'success'
                    }, function () {
                        $state.reload();
                    });
                });
        });
    }

};


function detallesController(simpatizante, distSecciones) {
    var that = this;
    angular.extend(this, simpatizante);
    this.distritos = _(distSecciones).chain().pluck('distrito').thru(function (value) {
        return (!value.length) ? [value] : value;
    }).sortByAll('numero').value();
    that.distrito = that.distritos[0];

    function getSecciones() {
        if (distSecciones.length) {
            that.secciones = _(distSecciones).chain().map(function (object) {
                if (object.distrito.numero == that.distrito.numero) {
                    return object.secciones;
                }
            }).compact().reduce().sortByAll('numero').value();
            that.seccion = that.secciones[0];
        }
    }

    getSecciones();
    this.getSecciones = getSecciones;
}
detallesController.$inject = ['simpatizante', 'distSecciones'];

angular
    .module('electoralApp')
    .controller('simpatizantesController', controller);

controller.$inject = ['$modal', '$state', 'simpatizantes', 'SweetAlert', 'usuario', 'distrito'];

