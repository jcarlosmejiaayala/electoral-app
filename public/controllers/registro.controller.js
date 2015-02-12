'use strict';

var controller = function (estados, SweetAlert, usuario) {
    var that = this;
    this.form = {};
    angular.extend(this, {
        partidos: ['pri', 'pan', 'prd', 'pt', 'morena', 'ind', 'pve', 'mc', 'panal'],
        candidaturas: ['Alcaldia', 'Diputación Local', 'Diputación Federal', 'Gobernatura', 'Presidencia Nacional'],
        confirmpassword: '',
    });
    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        partido: this.partidos[0],
        candidatura: this.candidaturas[0],
        status: true,
        contraseña: '',
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

    this.checkIsEqualsThesePasswords = function () {
        return _.isEqual(this.form.password, this.confirmpassword);
    };

    this.submit = function (isValid) {
        if (!isValid) {
            SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
            return null;
        }
        if (!this.checkIsEqualsThesePasswords()) {
            SweetAlert.swal({
                title: 'Verifique su contraseña nuevamente, no es igual a la contraseña ingresada.',
                type: 'warning'
            });
            return null;
        }
        usuario
            .save(this.form)
            .then(function (data) {
                debugger;
            }, function (err) {
                SweetAlert
                    .swal({
                        title: 'Ocurrio algo inesperado',
                        text: err,
                        type: 'warning'
                    });
            });
    };
};

angular
    .module('electoralApp')
    .controller('registroController', controller);

controller.$inject = ['estados', 'SweetAlert', 'usuario'];