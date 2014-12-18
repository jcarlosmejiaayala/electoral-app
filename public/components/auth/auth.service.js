(function(){
    'use strict';
    function factory($sessionStorage, usuario){
        var auth = {},
            currentUser = {};

        if($sessionStorage.token){
            currentUser = usuario.get();
        }
        auth.isLoggedIn = function(){
            //return
        };
        return {
          isLoggedIn: auth.isLoggedIn
        };
    }
    angular
        .module('electoralApp')
        .factory('auth', factory);
    factory.$inject = ['$sessionStorage', 'usuario'];
})();