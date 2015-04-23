'use strict';

var factory = function ($q, $http) {
    return ({
        getDistritoAndSecciones: function (simpatizante) {
            return $q(function (resolve) {
                return $http.get('/distrito/secciones', {
                    params: {
                        simpatizante: simpatizante
                    }
                }).success(function (response) {
                    resolve(response);
                });
            });
        },
        get: function () {
            return $q(function (resolve) {
                return $http.get('/distrito').success(function (response) {
                    resolve(response);
                });
            });
        },
        getSecciones: function (id) {
            return $q(function (resolve, reject) {
                return $http.get('/distrito/' + id)
                    .success(function (response) {
                        resolve(response);
                    });
            });
        },
        getVotantesPorSeccion: function (idDistrito, idSeccion) {
            return $q(function (resolve) {
                return $http.get(['/distrito/', idDistrito, '/', idSeccion].join(''))
                    .success(function (response) {
                        resolve(response);
                    });
            });
        }
    });
};

angular
    .module('electoralApp')
    .factory('distrito', factory);

factory.$inject = ['$q', '$http'];