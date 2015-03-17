'use strict';

var factory = function (usuarioResource, candidatoResource, administradorResource, representanteGeneralResource, representanteCasillaResource, simpatizanteResource, $sessionStorage, $http, $q) {
    function get() {
        return usuarioResource.get(function (data) {
            return data;
        }, function (err) {
            throw err.data.message;
        }).$promise;
    }

    function createSession(data) {
        if (data.token) {
            return angular.extend($sessionStorage, {
                token: data.token,
                perfil: data.perfil
            });
        }
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
                reject(err.message);
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

    function getInstanciaForRol(rol) {
        return ({
            'candidato': function () {
                return (candidatoResource);
            },
            'administrador': function () {
                return (administradorResource);
            },
            'representante general': function () {
                return (representanteGeneralResource);
            },
            'representante de casilla': function () {
                return (representanteCasillaResource);
            },
            'simpatizante': function () {
                return (simpatizanteResource);
            }
        }[rol]());
    }

    function save(data) {
        return getInstanciaForRol(data.rol)
            .save(data, function (response) {
                return createSession(response);
            }, function (err) {
                throw err.data.message;
            }).$promise;
    }

    function getPlanilla() {
        return usuarioResource.getPlanilla(function (response) {
            return (response);
        }).$promise;
    }

    function update(data) {
        return usuarioResource.update(data, function (response) {
            return (response);
        }).$promise;
    }

    function remove(id) {
        return usuarioResource.remove(id, function (response) {
            return (response);
        }).$promise;
    }

    return ({
        get: get,
        createSession: createSession,
        isLoggin: isLoggin,
        login: login,
        logout: logout,
        save: save,
        update: update,
        remove: remove,
        getPlanilla: getPlanilla
    });
};

angular
    .module('electoralApp')
    .factory('usuario', factory);

factory.$inject = ['usuarioResource', 'candidatoResource', 'administradorResource', 'representanteGeneralResource', 'representanteCasillaResource', 'simpatizanteResource', '$sessionStorage', '$http', '$q'];