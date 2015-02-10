'use strict';

var controller = function (estados, SweetAlert) {
    var that = this;
    this.form = {};
    angular.extend(this, {
        partidos: ['pri', 'pan', 'prd', 'pt', 'morena', 'ind', 'pve', 'mc', 'panal'],
        candidaturas: ['Alcaldia', 'Diputación Local', 'Diputación Federal', 'Gobernatura', 'Presidencia Nacional']
    });
    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        partido: this.partidos[0],
        candidatura: this.candidaturas[0],
        status: true,
        rol: 'candidato'
    });
    estados
        .get()
        .then(function (data) {
            that.estados = data;
            that.form.estado = data[0];
        }, function (err) {
            SweetAlert
                .swal({
                    title: 'Ocurrio algo inesperado',
                    text: err,
                    type: 'warning'
                });
        });
};

angular
    .module('electoralApp')
    .controller('registroController', controller);

controller.$inject = ['estados', 'SweetAlert'];