'use strict';

var factory = function ($http, $q) {
    return ({
        setVoto: function (id) {
            return $q(function (resolve, reject) {
                return $http.post('/simpatizante/voto', {
                    params: {
                        id: id
                    }
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
    .factory('votante', factory);

factory.$inject = ['$http', '$q'];