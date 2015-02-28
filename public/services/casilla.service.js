'use strict';

var factory = function ($http, $q) {
    return ({
        get: function (data) {
            return $q(function (resolve, reject) {
                return $http.get('/casilla', {
                    params: data
                }).success(function (response, status) {
                    if (status == 204) {
                        reject("No hay casillas registradas en la base de datos.");
                    }
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
    .factory('casilla', factory);
factory.$inject = ['$http', '$q'];