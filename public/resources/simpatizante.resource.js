'use strict';

var factory = function ($resource) {
    return $resource('/simpatizante/:id/:controller',
        {},
        {
            update: {
                method: 'PUT'
            },
            get: {
                method: 'GET',
                isArray: true
            }
        });
};

angular
    .module('electoralApp')
    .factory('simpatizanteResource', factory);

factory.$inject = ['$resource'];