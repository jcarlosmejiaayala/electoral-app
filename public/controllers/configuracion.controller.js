'use strict';

var controller = function (me, $modal, $state, usuario, SweetAlert) {
    angular.extend(this, me);
    this.isDisabled = true;
    this.cuentaDisabled = moment().diff(this.expira, 'days');
    if (this.cuentaDisabled <= 7) {
        this.isCuentaDisabled = true;
    }
    this.registroInit = moment(this.creado).format('DD/MM/YYYY');
    this.registroVencimiento = moment(this.expira).format('DD/MM/YYYY');
    this.changePassword = function () {
        $modal.open({
            templateUrl: 'change-password.html',
            controller: changePasswordController,
            controllerAs: 'pass',
            backdrop: 'static'
        });
    };
    this.submit = function (isValid) {
        if(!isValid){
            return SweetAlert.swal({
                title: 'Faltan algunos campos por completar.',
                type: 'warning'
            });
        }
        usuario.update(this)
            .then(function () {
                SweetAlert.swal({
                    title: 'Los cambios fueron realizados con éxito.',
                    type: 'success'
                }, function(){
                    $state.reload();
                });
            });
    };
};

function changePasswordController($modalInstance, usuario, SweetAlert) {
    this.setNewPassword = function () {
        usuario.update({password: this.newPassword})
            .then(function () {
                SweetAlert.swal({
                    title: 'Se nuevo contraseña fue dada de alta con éxito.',
                    type: 'success'
                }, function () {
                    $modalInstance.close();
                });
            });
    };
}
changePasswordController.$inject = ['$modalInstance', 'usuario', 'SweetAlert'];
angular
    .module('electoralApp')
    .controller('configuracionController', controller);

controller.$inject = ['me', '$modal', '$state', 'usuario', 'SweetAlert'];