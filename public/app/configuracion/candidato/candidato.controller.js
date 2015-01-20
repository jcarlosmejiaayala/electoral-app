(function () {
    'use strict';

    function controller($modal, candidatos) {
        var modalInstance,
            scope = this;
        this.candidatos = candidatos;
        this.tableHeaders = ['Nombre', 'Estado', 'Candidatura', 'Partido', 'Status', 'Detalles'];

        this.modalDetalles = function ($index) {
            modalInstance = $modal.open({
                templateUrl: 'modalDetalles.html',
                controller: modalDetallesController,
                controllerAs: 'modal',
                backdrop: 'static',
                resolve: {
                    candidato: function () {
                        return scope.candidatos[$index];
                    }
                }
            });
            modalInstance.result.then(function () {
            }, function () {
            });
        };


        function modalDetallesController($scope, candidato, estados, $modalInstance, SweetAlert) {
            var currentState, currentCandidatura, currentPartido, scope;
            scope = this;
            this.data = candidato;
            this.active = true;
            this.estados = estados.mexico.estados;
            this.candidaturas = ['Alcaldia', 'Diputación Local', 'Diputación Federal', 'Gobernatura', 'Presidencia Nacional'];
            this.partidos = ['pri', 'pan', 'prd', 'pt', 'morena', 'ind', 'pve', 'mc', 'panal'];
            currentState = _(this.estados).chain().map('nombre').indexOf(this.data.estado).value();
            currentCandidatura = _.indexOf(this.candidaturas, this.data.candidatura);
            currentPartido = _.indexOf(this.partidos, this.data.partido);
            this.data.estado = this.estados[currentState].nombre;
            this.data.candidatura = this.candidaturas[currentCandidatura];
            this.data.partido = this.partidos[currentPartido];

            this.deleteCandidato = function () {
                SweetAlert.swal({
                        title: "¿Desea dar de baja a este candidato?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Hecho",
                        cancelButtonText: "Cancelar"
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            $modalInstance.close();
                            SweetAlert.swal("Eliminado", "El candidato ha sido dado de baja exitosamente", "success");
                        }
                    });
            };

            this.submit = function () {

            }
        }

        modalDetallesController.$inject = ['$scope', 'candidato', 'estados', '$modalInstance', 'SweetAlert'];
    }

    angular
        .module('electoralApp')
        .controller('configCandidatoController', controller);

    controller.$inject = ['$modal', 'candidatos'];
})();