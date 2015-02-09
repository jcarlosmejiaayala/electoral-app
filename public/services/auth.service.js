'use strict';
function factory($sessionStorage, usuario) {
    var auth = {},
        currentUser = {};

    if ($sessionStorage.token) {
        currentUser = usuario.get();
    }
    auth.isLoggedIn = function () {
        return ((currentUser.hasOwnProperty('rol')) ? currentUser.rol : 0);
    };
    return {
        isLoggedIn: auth.isLoggedIn
    };
}
angular
    .module('electoralApp')
    .factory('auth', factory);
factory.$inject = ['$sessionStorage', 'usuario'];