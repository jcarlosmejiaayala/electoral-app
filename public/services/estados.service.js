'use strict';

var factory = function ($http) {
    return ({
        get: function (cb) {
            return $http({
                url: '/estados',
                method: 'get'
            }).then(function (response) {
                return (_.pluck(response.data.estados, 'nombre'));
            }, function (err) {
                throw err.data.message;
            });
        }
    });
};

angular
    .module('electoralApp')
    .factory('estados', factory);

factory.$inject = ['$http'];