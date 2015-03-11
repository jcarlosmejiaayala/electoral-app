'use strict';

var controller = function ($scope, $modal, $state, user, usuario, SweetAlert) {
    var that = this;
    that.me = user;
    this.form = {};

    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {}
    });
    if (that.me.estado) {
        this.form.estado = this.me.estado
    }
    if (that.me.municipio) {
        this.form.municipio = this.me.municipio;
    }
    this.form.rol = {
        'candidato': function () {
            that.roles = ['administrador', 'representante general'];
            that.template = that.me.rol;
            return (that.roles[0]);
        },
        'administrador': function () {
            that.template = that.me.rol;
            return ('representante general');
        },
        'representante general': function () {
            that.template = 'representant-general';
            return ('representante de casilla');
        },
        'representante de casilla': function () {
            that.template = 'representant-casilla';
            return ('simpatizante');
        }
    }[this.me.rol]();


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
};

angular
    .module('electoralApp')
    .controller('simpatizantesNuevoController', controller);

controller.$inject = ['$scope', '$modal', '$state', 'user', 'usuario', 'SweetAlert'];