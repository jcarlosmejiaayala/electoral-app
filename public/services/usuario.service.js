'use strict';

function factory(usuarioResource, $sessionStorage) {
    var usuario = {},
        currentUser = {};
    usuario.get = function () {
        return usuarioResource.get(function (user) {
            currentUser = user;
        }).$promise;
    };
    usuario.save = function (data) {
        return usuarioResource.save(data,
            function (response) {
                $sessionStorage.token = response.token;
                return usuario.get();
            },
            function (err) {
                throw err.data.message;
            }).$promise;
    };

    usuario.isLoggedIn = function () {
        return ((currentUser.hasOwnProperty('rol')) ? currentUser.rol : 0);
    };
    if ($sessionStorage.token) {
        usuario.get();
    }
    return ({
        get: usuario.get,
        query: usuario.query,
        save: usuario.save,
        isLoggedIn: usuario.isLoggedIn
    });
}

angular
    .module('electoralApp')
    .factory('usuario', factory);

factory.$inject = ['usuarioResource', '$sessionStorage'];