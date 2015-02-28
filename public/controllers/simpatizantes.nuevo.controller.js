'use strict';

var controller = function ($scope, user, estados, SweetAlert, ESTADOS) {
    var that = this;
    this.me = user;
    this.form = {};
    angular.extend(this, {
        estados: ESTADOS
    });
    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        estado: that.estados[0],
        municipio: '',
        contraseña: '',
        email: '',
        distrito: 1
    });
    this.submit = function (isValid) {
        if (!isValid) {
            return SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
        }
    };
    $scope.$watchCollection('simpatizante.form.estado', function (_new) {
        estados
            .get({nombre: _new})
            .then(function (data) {
                that.municipios = data.municipios;
                that.form.municipio = data.municipios[0].nombre;
            }).catch(function (err) {
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
    .controller('simpatizantesNuevoController', controller);

controller.$inject = ['$scope', 'user', 'estados', 'SweetAlert', 'ESTADOS'];