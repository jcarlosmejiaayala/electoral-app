'use strict';

var factory = function ($resource) {
    return $resource('/usuario/:id/:controller',
        {
            id: '@_id'
        },
        {
            update: {
                method: 'PUT'
            },
            changePassword: {
                method: 'PUT',
                params: {
                    controller: 'password'
                }
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