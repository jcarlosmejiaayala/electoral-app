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
        }
    });
};

angular
    .module('electoralApp')
    .factory('distrito', factory);

factory.$inject = ['$q', '$http'];