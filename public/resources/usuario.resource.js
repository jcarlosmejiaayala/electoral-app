'use strict';

var factory = function ($resource) {
    return $resource('/usuario/:id/:controller',
        {},
        {
            update: {
                method: 'PUT'
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            },
            getPlanilla:{
                method: 'GET',
                params: {
                    controller: 'planilla'
                },
                isArray: true
            }
        });
};

angular
    .module('electoralApp')
    .factory('usuarioResource', factory);
factory.$inject = ['$resource'];