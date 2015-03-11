'use strict';

var controller = function ($scope) {
    angular.extend(this, $scope.$parent.$parent.simpatizante);
    this.distritos = _(this.me.distrito).chain().map(function (object) {
        if (!object.numero.isBusy) {
            return object;
        }
    }).reduce().thru(function (value) {
        return (_.isObject(value)) ? [value] : value;
    }).value();
    var that = this;
    this.getSecciones = getSecciones;
    function getSecciones() {
        return _(that.distritos).chain().map(function (object) {
            if (object.numero.id == that.form.distrito.numero) {
                return object;
            }
        }).reduce().pick('secciones').reduce().value()
    }

    function getRepresentante() {
        angular.extend(that.form, {
            distrito: {
                numero: (that.distritos) ? that.distritos[0].numero.id : that.distritos,
                secciones: {}
            }
        });

        angular.extend(that, {
            secciones: getSecciones()
        });
        that.form.distrito.secciones.min = that.secciones[0].numero;
        that.form.distrito.secciones.max = that.secciones[that.secciones.length - 1].numero;
    }

    this.changeRol = function () {
        if (_.isEqual(this.form.rol, 'representante general')) {
            getRepresentante();
        }
        else {
            if (that.form.distrito) {
                delete that.form.distrito;
            }
        }
    }
};


angular
    .module('electoralApp')
    .controller('candidatoNuevoCandiatoController', controller);

controller.$inject = ['$scope'];