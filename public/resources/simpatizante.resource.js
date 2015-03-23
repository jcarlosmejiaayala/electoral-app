'use strict';

var factory = function ($resource) {
    return $resource('/simpatizante/:id/:distrito/:controller',
        {},
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