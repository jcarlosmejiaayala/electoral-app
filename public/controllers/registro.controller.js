'use strict';

var controller = function (estados, SweetAlert, $q) {
    this.form = {};
    function getEstados() {
        return $q(function (resolve, reject) {
            estados.get(function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    this.estados = getEstados()
        .then(function (data) {
            return data.estados;
        }, function (err) {
            SweetAlert.swal({
                title: 'Ocurrio algo inesperado.',
                text: err.message,
                type: 'warning'
            });
        });
};

angular
    .module('electoralApp')
    .controller('registroController', controller);

controller.$inject = ['estados', 'SweetAlert', '$q'];