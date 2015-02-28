'use strict';
var detallesController = function ($modalInstance, casillas, pagination, selects, casilla) {
    var that = this;
    this.casillas = casillas;
    this.isBusy = false;
    if (!_.has(pagination, 'skip')) {
        angular.extend(pagination, {
            skip: 50
        });
    }
    this.detalles = function () {
        that.isBusy = true;
        casilla.get(_.merge({selects: selects}, {filters: pagination}))
            .then(function (response) {
                that.isBusy = false;
                pagination.skip += 50;
                _.forEach(response, function (item) {
                    that.casillas.push(item);
                });
            }).catch(function () {
                that.isBusy = false;
            });
    };
};
detallesController.$inject = ['$modalInstance', 'casillas', 'pagination', 'selects', 'casilla'];
var controller = function ($scope, $state, $modal, estados, SweetAlert, candidato, casilla, ESTADOS, PARTIDOS, CANDIDATURAS) {
    var that = this;
    this.form = {};
    angular.extend(this, {
        partidos: PARTIDOS,
        candidaturas: CANDIDATURAS,
        estados: ESTADOS,
        sentenceCasilla: '',
        pagination: {
            limit: 50
        }
    });
    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        partido: this.partidos[0],
        candidatura: this.candidaturas[0],
        contraseña: '',
        estado: that.estados[0],
        municipio: '',
        email: '',
        distrito: 1
    });

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
            'Gobernatura': function () {
                that.availableDistrict = false;
                return ({estado: that.form.estado});
            },
            'Presidencia Nacional': function () {
                that.availableDistrict = false;
                return ({});
            }
        }[(!!/^Diputación/.test(this.form.candidatura)) ? 'Diputacion' : that.form.candidatura]();
    };

    this.checkIsEqualsThesePasswords = function () {
        return _.isEqual(this.form.password, this.confirmpassword);
    };
    this.submit = function (isValid) {
        if (!this.availableDistrict) {
            delete this.form.distrito;
        }
        if (!isValid) {
            return SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
        }
        candidato
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
    this.detalles = function () {
        casilla.get(_.merge({selects: that.sentenceCasilla}, {filters: that.pagination}))
            .then(function (response) {
                $modal.open({
                    templateUrl: 'detalles.html',
                    controller: detallesController,
                    controllerAs: 'detalle',
                    size: 'lg',
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

controller.$inject = ['$scope', '$state', '$modal', 'estados', 'SweetAlert', 'candidato', 'casilla', 'ESTADOS', 'PARTIDOS', 'CANDIDATURAS'];