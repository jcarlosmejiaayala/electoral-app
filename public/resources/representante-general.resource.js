'use strict';

var factory = function ($resource) {
    return $resource('/representante-general/:id/:controller',
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
    .factory('representanteGeneralResource', factory);

factory.$inject = ['$resource'];