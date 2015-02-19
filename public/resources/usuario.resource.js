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
                    password: 'password'
                }
            },
            get: {
                method: 'GET',
                params: {
                    id: 'me'
                }
            }
        });
};

angular
    .module('electoralApp')
    .factory('usuarioResource', factory);
factory.$inject = ['$resource'];