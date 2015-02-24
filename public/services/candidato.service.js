'use strict';

var factory = function (candidatoResource, usuario) {
    function save(data) {
        return candidatoResource.save(data, function (response) {
            return usuario.createSession(response.token);
        }, function (err) {
            throw err.data.message;
        }).$promise;
    }

    return ({
        save: save
    });
};

angular
    .module('electoralApp')
    .factory('candidato', factory);

factory.$inject = ['candidatoResource', 'usuario'];