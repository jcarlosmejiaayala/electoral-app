'use strict';

var controller = function($state, SweetAlert, usuario) {
    this.form = {};
    angular.extend(this.form, {
        email: '',
        password: ''
    });
    this.submit = function (isValid) {
        if (!isValid) {
            return SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
        }
        usuario
            .login(this.form)
            .then(function () {
                $state.go('conteo');
            })
            .catch(function () {
                SweetAlert.swal({
                    title: 'Error al iniciar sesión.',
                    text: 'Verifica nuevamente.',
                    type: 'warning'
                });
            });
    };
};

angular
    .module('electoralApp')
    .controller('loginController', controller);
controller.$inject = ['$state', 'SweetAlert', 'usuario'];