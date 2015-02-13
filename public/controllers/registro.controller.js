'use strict';

var controller = function ($scope, estados, SweetAlert, usuario) {
    var that = this;
    this.form = {};
    angular.extend(this, {
        partidos: ['pri', 'pan', 'prd', 'pt', 'morena', 'ind', 'pve', 'mc', 'panal'],
        candidaturas: ['Alcaldia', 'Diputación Local', 'Diputación Federal', 'Gobernatura', 'Presidencia Nacional'],
        confirmpassword: '',
        estados: ["AGUASCALIENTES", "BAJA CALIFORNIA", "BAJA CALIFORNIA SUR", "CAMPECHE", "COAHUILA", "COLIMA", "DISTRITO FEDERAL", "NAYARIT", "CHIAPAS", "CHIHUAHUA", "DURANGO", "GUANAJUATO", "GUERRERO", "HIDALGO", "JALISCO", "ESTADO DE MEXICO", "MICHOACAN", "MORELOS", "NUEVO LEON", "OAXACA", "PUEBLA", "QUERETARO", "QUINTANA ROO", "SAN LUIS POTOSI", "SINALOA", "SONORA", "TABASCO", "TAMAULIPAS", "TLAXCALA", "ZACATECAS", "VERACRUZ", "YUCATAN"]
    });
    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        partido: this.partidos[0],
        candidatura: this.candidaturas[0],
        status: true,
        contraseña: '',
        rol: 'candidato',
        estado: that.estados[0],
        municipio: '',
        distrito: null
    });

    this.changeCandidatura = function() {
        this.availableDistrict = !!/^Diputación/.test(this.form.candidatura);
    };

    this.checkIsEqualsThesePasswords = function () {
        return _.isEqual(this.form.password, this.confirmpassword);
    };

    this.submit = function (isValid) {
        if (!isValid) {
            return SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
        }
        if (!this.checkIsEqualsThesePasswords()) {
            return SweetAlert.swal({
                title: 'Verifique su contraseña nuevamente, no es igual a la contraseña ingresada.',
                type: 'warning'
            });
        }
        usuario
            .save(this.form)
            .then(function (data) {
                debugger;
            }, function (err) {
                return SweetAlert
                    .swal({
                        title: 'Ocurrio algo inesperado',
                        text: err,
                        type: 'warning'
                    });
            });
    };
    $scope.$watchCollection('registro.form.estado', function (_new) {
        estados
            .get(_new)
            .then(function (data) {
                that.municipios = data.municipios;
                that.form.municipio = data.municipios[0];
            }, function (err) {
                return SweetAlert.swal({
                    title: 'Ocurrio algo inesperado',
                    text: err,
                    type: 'warning'
                });
            });
    });
};

angular
    .module('electoralApp')
    .controller('registroController', controller);

controller.$inject = ['$scope', 'estados', 'SweetAlert', 'usuario'];