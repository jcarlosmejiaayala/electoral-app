'use strict';

var factory = function (estadosResource) {
    return ({
        get: function (data) {
            return estadosResource
                .get({estado: data},
                function (response) {
                    return (response);
                }, function (err) {
                    throw err.message;
                }).$promise;
        }
    });
};

angular
    .module('electoralApp')
    .factory('estados', factory);

factory.$inject = ['estadosResource'];