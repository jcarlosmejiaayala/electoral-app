'use strict';

var controller = function ($scope) {
    angular.extend(this, $scope.$parent.$parent.simpatizante);
    this.user.distSecciones = this.user.distSecciones.sort(function (prev, next) {
        return (prev.distrito.numero - next.distrito.numero);
    });
    this.distritos = _(this.user.distSecciones).chain().pluck('distrito').map(function (object) {
        if (!object.numero.isBusy) {
            return object;
        }
    }).thru(function (value) {
        return (!value.length) ? [value] : value;
    }).value();

    var that = this;
    that.distrito = (that.distritos) ? that.distritos[0] : that.distritos;
    this.getSecciones = getSecciones;

    function setSecciones() {
        that.secciones = _(that.user.distSecciones).chain().map(function (object) {
            if (object.distrito.numero == that.distrito.numero) {
                return object.secciones;
            }
        }).compact().reduce().sortByAll('numero').value();
    }

    function getSecciones() {
        that.form.distSecciones.distrito = that.distrito._id;
        setSecciones();
        that.interval = {
            seccionesMin: that.secciones[0],
            seccionesMax: that.secciones[that.secciones.length - 1]
        };
    }

    function getRepresentante() {
        angular.extend(that.form, {
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
            }
        }
    };
    this.changeSeccion = function(){
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
    $scope.$watchCollection('candidato.interval', function (_new) {
        if (_new && _new.seccionesMax.numero >= _new.seccionesMin.numero) {
            that.form.distSecciones.secciones = _(that.secciones).chain().map(function (object) {
                if (object.numero >= _new.seccionesMin.numero && object.numero <= _new.seccionesMax.numero) {
                    return (object._id);
                }
            }).compact().value();
        }
    });
};


angular
    .module('electoralApp')
    .controller('candidatoNuevoCandiatoController', controller);

controller.$inject = ['$scope'];