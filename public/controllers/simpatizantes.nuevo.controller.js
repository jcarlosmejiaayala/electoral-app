'use strict';

var controller = function ($scope, $modal, $state, user, usuario, estados, casilla, SweetAlert, ESTADOS) {
    var that = this;
    this.me = user.user;
    this.distritos = user.distritos;
    this.form = {};
    angular.extend(this, {
        sentenceCasilla: '',
        pagination: {
            limit: 50
        },
        estados: (that.me.estado) ? that.me.estado : ESTADOS
    });

    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        estado: (angular.isArray(that.estados)) ? that.estados[0] : that.estados,
        municipio: (that.me.municipio) ? that.me.municipio : '',
        email: ''
    });
    if (this.me.rol) {
        this.form.rol = {
            'candidato': function () {
                that.roles = ['administrador', 'representante general'];
                return (that.roles[0]);
            },
            'administrador': function () {
                return ('representante general');
            },
            'representante general': function () {
                return ('representante de casilla');
            },
            'representante de casilla': function () {
                return ('simpatizante');
            }
        }[this.me.rol]();
        this.form.distrito = that.distritos[0];
        getSecciones();
    }
    this.getSecciones = getSecciones;

    function getSecciones() {
        casilla.getSecciones({distrito: that.form.distrito})
            .then(function (secciones) {
                that.secciones = secciones;
                that.form.secciones = [that.secciones[0]];
            }).catch(function () {
                return SweetAlert
                    .swal({
                        title: 'No hay secciones para este distrito',
                        type: 'warning'
                    });
            });
    }

    this.changeCandidatura = function () {
        this.sentenceCasilla = {
            'Diputacion': function () {
                that.availableDistrict = true;
                return ({estado: that.form.estado, distrito: that.form.distrito});
            },
            'Alcaldia': function () {
                that.availableDistrict = false;
                return ({estado: that.form.estado, municipio: that.form.municipio});
            },
            'Gubernatura': function () {
                that.availableDistrict = false;
                return ({estado: that.form.estado, municipio: that.form.municipio});
            },
            'Presidencia Nacional': function () {
                that.availableDistrict = false;
                return ({estado: that.form.estado, municipio: that.form.municipio});
            }
        }[(!!/^Diputación/.test(this.form.candidatura)) ? 'Diputacion' : that.form.candidatura]();
    };
    this.detalles = function () {
        casilla.get(_.merge({selects: that.sentenceCasilla}, {filters: that.pagination}))
            .then(function (response) {
                $modal.open({
                    templateUrl: 'views/partials/casilla/detalles.html',
                    controller: casillaDetalles,
                    controllerAs: 'detalle',
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
        usuario
            .save(this.form)
            .then(function () {
                SweetAlert.swal({
                    title: 'Su simpatizante fue guardado con éxito',
                    type: 'success'
                }, function () {
                    $state.go('simpatizantes');
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
    $scope.$watchCollection('simpatizante.form.estado', function (_new) {
        estados
            .get({nombre: _new})
            .then(function (data) {
                if (!that.me.municipio) {
                    that.municipios = data.municipios;
                    that.form.municipio = data.municipios[0].nombre;
                }
            });
    });
};

angular
    .module('electoralApp')
    .controller('simpatizantesNuevoController', controller);

controller.$inject = ['$scope', '$modal', '$state', 'user', 'usuario', 'estados', 'casilla', 'SweetAlert', 'ESTADOS'];