'use strict';

var controller = function ($scope, $state, $modal, estados, SweetAlert, usuario, ESTADOS, PARTIDOS, CANDIDATURAS) {
    var that = this;
    this.form = {};
    angular.extend(this, {
        partidos: PARTIDOS,
        candidaturas: CANDIDATURAS,
        estados: ESTADOS,
        checkTerminos: true
    });
    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        partido: this.partidos[0],
        rol: 'candidato',
        candidatura: this.candidaturas[0],
        password: '',
        estado: that.estados[0],
        municipio: '',
        email: '',
        distritos: [{
            secciones: [{}]
        }]
    });

    this.changeCandidatura = function () {
        this.form.distritos = [{
            secciones: [{}]
        }];
    };

    this.checkIsEqualsThesePasswords = function () {
        return _.isEqual(this.form.password, this.confirmpassword);
    };
    this.openTerminos = function () {
        $modal.open({
            templateUrl: 'terminos.html'
        });
    };
    this.submit = function (isValid) {
        if (!isValid) {
            return SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
        }
        if (!/^Diputación/.test(this.form.candidatura)) {
            delete this.form.distrito;
        }
        if (_.contains(['Presidencia Nacional'], this.form.candidatura)) {
            delete this.form.estado;
        }
        if (_.contains(['Presidencia Nacional', 'Gubernatura', 'Diputación Federal', 'Diputación Local'], this.form.candidatura)) {
            delete this.form.municipio;
        }
        usuario
            .save(this.form)
            .then(function () {
                SweetAlert.swal({
                    title: 'Se ha registrado con éxito',
                    type: 'success'
                }, function () {
                    $state.go('conteo');
                });
            }).catch(function (err) {
                SweetAlert
                    .swal({
                        title: 'Ocurrio algo inesperado',
                        text: err,
                        type: 'warning'
                    }, function () {
                        $state.reload();
                    });
            });
    };
    $scope.$watchCollection('registro.form.estado', function (_new) {
        estados
            .get({nombre: _new})
            .then(function (data) {
                that.municipios = data.municipios;
                that.form.municipio = data.municipios[0].nombre;
                that.changeCandidatura();
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
    .controller('registroController', controller);

controller.$inject = ['$scope', '$state', '$modal', 'estados', 'SweetAlert', 'usuario', 'ESTADOS', 'PARTIDOS', 'CANDIDATURAS'];