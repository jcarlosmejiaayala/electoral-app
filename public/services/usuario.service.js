'use strict';

var factory = function (usuarioResource, $sessionStorage, $http, $q) {
    function get() {
        return usuarioResource.get(function (data) {
            return data;
        }, function (err) {
            throw err.data.message;
        }).$promise;
    }

    function save(data) {
        return usuarioResource.save(data,
            function (response) {
                return $sessionStorage.token = response.token;
            },
            function (err) {
                throw err.data.message;
            }).$promise;
    }

    function login(data) {
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
        save: save,
        isLoggin: isLoggin,
        login: login
    });
};

angular
    .module('electoralApp')
    .factory('usuario', factory);

factory.$inject = ['usuarioResource', '$sessionStorage', '$http', '$q'];