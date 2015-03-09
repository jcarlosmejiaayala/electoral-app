'use strict';

var controller = function ($scope, $modal, $state, user, usuario, SweetAlert) {
    var that = this;
    that.me = user;
    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {},
        distrito: {
            numero: that.me.distrito[0].numero,
            secciones: {}
        }
    });
    angular.extend(this, {
        secciones: getSecciones(),
        pagination: {
            limit: 50
        }
    });
    this.getSecciones = getSecciones;
    if (that.me.estado) {
        this.form.estado = this.me.estado
    }
    if (that.me.municipio) {
        this.form.municipio = this.me.municipio;
    }

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

    function getSecciones() {
        return _(user.distrito).chain().filter({numero: that.form.distrito.numero}).pluck('secciones').reduce().value();
    }

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