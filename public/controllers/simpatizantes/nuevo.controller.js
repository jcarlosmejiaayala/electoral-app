'use strict';

var controller = function ($state, user, usuario, SweetAlert) {
    var that = this;
    that.user = user;
    this.form = {};
    this.form.candidato = (this.user.me.rol == 'candidato') ? this.user.me._id : this.user.me.candidato;

    angular.extend(this.form, {
        telefonos: {},
        redesSociales: {}
    });
    if (this.user.me.estado) {
        this.form.estado = this.user.me.estado
    }
    if (that.user.me.municipio) {
        this.form.municipio = this.user.me.municipio;
    }
    this.form.rol = {
        'candidato': function () {
            that.roles = ['administrador', 'representante general'];
            that.template = that.user.me.rol;
            return (that.roles[0]);
        },
        'administrador': function () {
            that.template = that.user.me.rol;
            return ('representante general');
        },
        'representante general': function () {
            that.template = 'representante-general';
            return ('representante de casilla');
        },
        'representante de casilla': function () {
            that.template = 'representant-casilla';
            return ('simpatizante');
        }
    }[this.user.me.rol]();

    if (this.user.me.rol == 'representante de casilla') {
        this.form.rgeneral = this.user.me.rgeneral;
        this.form.rcasilla = this.user.me._id;
        this.form.distrito = this.user.me.distrito;
        this.form.seccion = this.user.distSecciones[0].secciones[0]._id;
    }

    this.submit = function (isValid) {
        if (!isValid) {
            return SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
        }
        if (this.form.rol == 'representante general') {
            this.form.distSecciones.secciones = _.uniq(_(this.form.seccionesIntervals).chain().map(function (interval) {
                if (interval.inicial > interval.final) {
                    var tmp = interval.inicial;
                    interval.inicial = interval.final;
                    interval.final = tmp;
                }
                return _(that.form.secciones).chain().filter(function (seccion) {
                    if (seccion.numero >= interval.inicial.numero && seccion.numero <= interval.final.numero) {
                        return (seccion._id);
                    }
                }).pluck('_id').value();
            }).union().flatten().value());
        }
        if (this.form.secciones) {
            delete this.form.secciones;
        }
        if (this.form.seccionesIntervals) {
            delete this.form.seccionesIntervals;
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

controller.$inject = ['$state', 'user', 'usuario', 'SweetAlert'];