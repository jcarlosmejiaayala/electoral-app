(function(){
    'use strict';

    function factory($sessionStorage, UsuarioResource){
        var Usuario = {};

        Usuario.query = function(cb){

        };

        Usuario.show = function(cb){

        };

        Usuario.create = function(cb){

        };

        Usuario.update = function(cb){

        };

        Usuario.destroy = function(cb){

        };

        return {
            query: Usuario.query,
            show: Usuario.show,
            create: Usuario.create,
            update: Usuario.update,
            destroy: Usuario.destroy
        };
    }

    angular
        .module('electoralApp')
        .factory('Usuario', factory);
})();