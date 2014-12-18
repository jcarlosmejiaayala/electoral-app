(function () {
    'use strict';

    function factory($resource) {
        return $resource('/usuario/:id', {
                id: '@_id'
            },
            {
                update: {
                    method: 'PUT'
                }
            });
    }

    angular
        .module('electoralApp')
        .factory('usuarioResource', factory);
    factory.$inject = ['$resource'];
})();