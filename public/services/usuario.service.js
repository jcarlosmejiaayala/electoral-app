'use strict';

var factory = function (usuarioResource, $sessionStorage, $http, $q) {
    function get() {
        return usuarioResource.get(function (data) {
            return data;
        }, function (err) {
            throw err.data.message;
        }).$promise;
    }

    function createSession(data) {
        return angular.extend($sessionStorage, {
            token: data.token,
            perfil: data.perfil
        });
    }

    function login(data) {
        return $q(function (resolve, reject) {
            $http.post('/auth/local', {
                email: data.email,
                password: data.password
            }).success(function (response) {
                createSession(response);
                resolve(response);
            }).error(function (err) {
                logout();
                reject(err);
            });
        });
    }

    function logout() {
        if ($sessionStorage.token) {
            delete $sessionStorage.token;
            delete $sessionStorage.perfil;
        }
    }

    function isLoggin(cb) {
        if ($sessionStorage.token) {
            get().then(function () {
                cb(true);
            }, function () {
                cb(false);
            });
        }
        else {
            cb(false);
        }
    }

    return ({
        get: get,
        createSession: createSession,
        isLoggin: isLoggin,
        login: login,
        logout: logout
    });
};

angular
    .module('electoralApp')
    .factory('usuario', factory);

factory.$inject = ['usuarioResource', '$sessionStorage', '$http', '$q'];