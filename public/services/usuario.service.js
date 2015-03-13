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
            'simpatizante': function(){
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

    return ({
        get: get,
        createSession: createSession,
        isLoggin: isLoggin,
        login: login,
        logout: logout,
        save: save
    });
};

angular
    .module('electoralApp')
    .factory('usuario', factory);

factory.$inject = ['usuarioResource', 'candidatoResource', 'administradorResource', 'representanteGeneralResource', 'representanteCasillaResource', 'simpatizanteResource', '$sessionStorage', '$http', '$q'];