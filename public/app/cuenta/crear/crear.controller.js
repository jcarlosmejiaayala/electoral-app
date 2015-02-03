(function () {
    'use strict';

    function controller() {
        var scope = this;
        this.data = {};
        this.data.telefonos = {};
        this.data.redesSociales = {};
        this.partidos = ['pri', 'pan', 'prd', 'pt', 'morena', 'ind', 'pve', 'mc', 'panal'];
        this.candidaturas = ['Alcaldia', 'Diputación Local', 'Diputación Federal', 'Gobernatura', 'Presidencia Nacional'];
        this.data.partido = this.partidos[0];
        this.data.candidatura = this.candidaturas[0];
        this.estados = estados.mexico.estados;
        this.data.estado = this.estados[0].nombre;
        this.data.status = true;
        this.data.rol = 'candidato';

        this.submit = function () {
            usuario.save(scope.data, function (err, data) {
                if (err) {
                    return SweetAlert.swal({
                        title: 'Registro fallido',
                        text: 'Ocurrio algo inesperado, intentalo nuevamente',
                        type: 'error'
                    });
                }
                SweetAlert.swal({
                    title: 'Registro Exitoso',
                    type: 'success'
                }, function () {
                    $state.go('configCandidato');
                });
            });
        };
    }

    angular
        .module('electoralApp')
        .controller('crearController', controller);

    controller.$inject = [];
})();