'use strict';

function factory(usuarioResource, $sessionStorage, $http, $q) {
    var usuario = {};

    usuario.get = function () {
        return usuarioResource.get(function (data) {
            return data;
        }, function (err) {
            throw err.data.message;
        }).$promise;
    };
    usuario.save = function (data) {
        return usuarioResource.save(data,
            function (response) {
                return $sessionStorage.token = response.token;
            },
            function (err) {
                throw err.data.message;
            }).$promise;
    };

    usuario.login = function (data) {
        return $q(function (resolve, reject) {
            $http.post('/auth/local', {
                email: data.email,
                password: data.password
            }).success(function (response) {
                $sessionStorage.token = response.token;
                resolve(response);
            }).error(function (err) {
                usuario.logout();
                reject(err);
            });
        });
    };
    usuario.isLoggin = function (cb) {
        if($sessionStorage.token){
            usuario.get().then(function (data) {
                cb(true);
            }, function (err) {
                cb(false);
            });
        }
        else {
            cb(false);
        }
    };
    usuario.logout = function () {
        if ($sessionStorage.token) {
            delete $sessionStorage.token;
        }
    };
    return ({
        get: usuario.get,
        query: usuario.query,
        save: usuario.save,
        isLoggin: usuario.isLoggin,
        login: usuario.login,
        logout: usuario.logout
    });
}

angular
    .module('electoralApp')
    .factory('usuario', factory);

factory.$inject = ['usuarioResource', '$sessionStorage', '$http', '$q'];