(function(){
    'use strict';
    function factory(Usuario){
        var auth = {};
        auth.isLoggedIn = function(){

        };
        return {
          isLoggedIn: auth.isLoggedIn
        };
    }
    angular
        .module('electoralApp')
        .factory('Auth', factory);
})();