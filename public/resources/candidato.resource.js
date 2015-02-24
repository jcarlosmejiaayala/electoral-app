'use strict';

var factory = function ($resource) {
    return $resource('/candidato/:id/:controller',
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
    .factory('candidatoResource', factory);

factory.$inject = ['$resource'];