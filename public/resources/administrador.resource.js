'use strict';

var factory = function ($resource) {
    return $resource('/administrador/:id/:controller',
        {
            id: '@_id'
        },
        {
            update: {
                method: 'PUT'
            }
        });
};

angular
    .module('electoralApp')
    .factory('administradorResource', factory);

factory.$inject = ['$resource'];