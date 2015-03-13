'use strict';

var factory = function ($q, $http) {
    return ({
        getDistritoAndSecciones: function () {
            return $q(function (resolve) {
                return $http.get('/distrito/secciones')
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