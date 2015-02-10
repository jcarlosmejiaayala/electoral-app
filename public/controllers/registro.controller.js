'use strict';

var controller = function (estados, SweetAlert) {
    var that = this;
    this.form = {};
    this.estados = estados
        .get()
        .then(function (data) {
            that.estados = data;
            that.form.estados = data[0];
        }, function (err) {
            SweetAlert
                .swal({
                    title: 'Ocurrio algo inesperado',
                    text: err,
                    type: 'warning'
                });
        });
};

angular
    .module('electoralApp')
    .controller('registroController', controller);

controller.$inject = ['estados', 'SweetAlert'];