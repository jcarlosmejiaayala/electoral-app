'use strict';

var factory = function ($resource) {
    return $resource('/simpatizante/:id/:controller',
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
    .factory('simpatizanteResource', factory);

factory.$inject = ['$resource'];