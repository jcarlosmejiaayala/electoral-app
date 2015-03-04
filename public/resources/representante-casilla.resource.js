'use strict';

var factory = function ($resource) {
    return $resource('/representante-casilla/:id/:controller',
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
    .factory('representanteCasillaResource', factory);

factory.$inject = ['$resource'];