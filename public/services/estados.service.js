'use strict';

var factory = function ($http) {
    return ({
        get: function (cb) {
            $http({
                url: '/estados',
                method: 'get'
            }).success(function (data) {
                return cb(null, data);
            }).error(function (err) {
                return cb(err);
            });
        }
    });
};

angular
    .module('electoralApp')
    .factory('estados', factory);

factory.$inject = ['$http'];