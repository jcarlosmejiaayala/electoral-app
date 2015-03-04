'use strict';

var controller = function ($scope, $state, $modal, estados, SweetAlert, usuario, casilla, pubsub, ESTADOS, PARTIDOS, CANDIDATURAS) {
    var that = this;
    this.form = {};
    angular.extend(this, {
        partidos: PARTIDOS,
        candidaturas: CANDIDATURAS,
        estados: ESTADOS,
        sentenceCasilla: '',
        availableSecciones: false,
        pagination: {
            limit: 50
        },
        loadDetalles: false
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
        distrito: {
            numero: 1,
            secciones: []
        }
    });

    this.changeCandidatura = function () {
        this.sentenceCasilla = {
            'Diputacion': function () {
                return ({distrito: that.form.distrito.numero});
            },
            'Alcaldia': function () {
                return ({estado: that.form.estado, municipio: that.form.municipio});
            },
            'Gubernatura': function () {
                return ({estado: that.form.estado});
            },
            'Presidencia Nacional': function () {
                return ({});
            }
        }[(!!/^Diputación/.test(this.form.candidatura)) ? 'Diputacion' : that.form.candidatura]();
    };

    this.checkIsEqualsThesePasswords = function () {
        return _.isEqual(this.form.password, this.confirmpassword);
    };
    this.detalles = function () {
        that.loadDetalles = true;
        casilla.get(_.merge({selects: that.sentenceCasilla}, {filters: that.pagination}))
            .then(function (response) {
                $modal.open({
                    templateUrl: 'views/partials/casilla/detalles.html',
                    controller: 'casillaDetalles as detalle',
                    resolve: {
                        casillas: function () {
                            return (response);
                        },
                        pagination: function () {
                            return (_.cloneDeep(that.pagination));
                        },
                        selects: function () {
                            return (that.sentenceCasilla);
                        }
                    }
                });
            }).catch(function (err) {
                return SweetAlert
                    .swal({
                        title: err,
                        type: 'warning'
                    });
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
        if (!this.availableSecciones) {
            delete this.form.distrito.secciones;
        }
        if (this.form.distrito.secciones) {
            this.form.distrito.secciones = _.map(_.pluck(this.form.distrito.secciones, 'text'), _.parseInt);
        }

        if (_.contains(['Presidencia Nacional', 'Diputación Federal'], this.form.candidatura)) {
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
                    $state.go('resultados');
                });
            }).catch(function (err) {
                return SweetAlert
                    .swal({
                        title: 'Ocurrio algo inesperado',
                        text: err,
                        type: 'warning'
                    });
            });
    };
    pubsub.subscribe('modal:close', function () {
        that.loadDetalles = false;
    });
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

controller.$inject = ['$scope', '$state', '$modal', 'estados', 'SweetAlert', 'usuario', 'casilla', 'pubsub', 'ESTADOS', 'PARTIDOS', 'CANDIDATURAS'];