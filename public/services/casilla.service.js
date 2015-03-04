'use strict';

var factory = function ($http, $q) {
    return ({
        get: function (data) {
            return $q(function (resolve, reject) {
                return $http.get('/casilla', {
                    headers: {'Content-type': 'application/json'},
                    params: data
                }).success(function (response, status) {
                    if (status == 204) {
                        return reject("No hay casillas registradas en la base de datos.");
                    }
                    resolve(response);
                }).error(function () {
                    return reject();
                });
            });
        },
        getForCandidato: function () {
            return $q(function (resolve, reject) {
                return $http
                    .get('/casilla/candidato')
                    .success(function (response, status) {
                        if (status == 204) {
                            return reject();
                        }
                        resolve(response);
                    }).catch(function () {
                        return reject();
                    });
            });

        },
        getSecciones: function(data){
            return $q(function (resolve, reject) {
                return $http
                    .get('/casilla/secciones',
                    {
                        headers: {'Content-type': 'application/json'},
                        params: data
                    })
                    .success(function (response, status) {
                        if (status == 204) {
                            return reject();
                        }
                        resolve(response);
                    }).catch(function () {
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