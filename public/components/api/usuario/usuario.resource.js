(function(){
    'use strict';

    function factory($resource){
        $resource('/usuario/:id',
            {
                id:'@id'
            },
            {
                update:{
                    method: 'PUT'
                },
                destroy:{
                    method: 'DELETE'
                }
            });
    }

    angular
        .module('electoralApp')
        .factory('UsuarioResource', factory);
})();