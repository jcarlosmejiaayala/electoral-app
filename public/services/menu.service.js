'use strict';

var factory = function ($http, $q) {
    return ({
        get: function () {
            return $q(function (resolve, reject) {
                $http
                    .get('/menu')
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function () {
                        reject();
                    });
            });
        }
    });
};
angular
    .module('electoralApp')
    .factory('menu', factory);

factory.$inject = ['$http', '$q'];