'use strict';

var controller = function ($scope) {
    angular.extend(this, $scope.$parent.$parent.simpatizante);
    if (this.user.distSecciones.length) {
        this.user.distSecciones = this.user.distSecciones.sort(function (prev, next) {
            return (prev.distrito.numero - next.distrito.numero);
        });
        this.distritos = _(this.user.distSecciones).chain().pluck('distrito').map(function (object) {
            if (!object.isBusy) {
                return object;
            }
        }).thru(function (value) {
            return (!value.length) ? [value] : value;
        }).sortByAll('numero').value();
    }
    var that = this;
    that.distrito = (that.distritos) ? that.distritos[0] : that.distritos;
    this.getSecciones = getSecciones;

    function setSecciones() {
        that.form.secciones = _(that.user.distSecciones).chain().map(function (object) {
            if (object.distrito.numero == that.distrito.numero) {
                return object.secciones;
            }
        }).compact().reduce().sortByAll('numero').value();
    }

    function getSecciones() {
        if (that.user.distSecciones.length) {
            that.form.distSecciones.distrito = that.distrito._id;
            setSecciones();
        }
    }

    function getRepresentante() {
        angular.extend(that.form, {
            seccionesIntervals: [{}],
            distSecciones: {}
        });
        getSecciones();
    }

    this.changeRol = function () {
        if (_.isEqual(this.form.rol, 'representante general')) {
            getRepresentante();
        }
        else {
            if (that.form.distSecciones) {
                delete that.form.distSecciones;
                delete that.form.seccionesIntervals;
                delete that.form.secciones;
            }
        }
    };
    this.changeSeccion = function () {
        that.form.seccion = that.seccion._id;
    };

    if (this.user.me.rol == 'administrador') {
        getRepresentante();
    }
    if (this.user.me.rol == 'representante general') {
        this.form.rgeneral = this.user.me._id;
        that.form.distrito = that.distrito._id;
        setSecciones();
        that.seccion = that.secciones[0];
        that.changeSeccion();
    }
};


angular
    .module('electoralApp')
    .controller('candidatoNuevoCandiatoController', controller);

controller.$inject = ['$scope'];