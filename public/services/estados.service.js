'use strict';

var factory = function ($http, $q) {
    return ({
        get: function (data) {
            return $q(function (resolve, reject) {
                return $http.get('/estados', {
                    params: data
                }).success(function (response) {
                    resolve(response);
                }).error(function () {
                    return reject();
                });
            });
        }
    });
};

angular
    .module('electoralApp')
    .factory('estados', factory);

factory.$inject = ['$http', '$q'];