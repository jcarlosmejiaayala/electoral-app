'use strict';

function factory(usuarioResource) {
    var usuario = {};

    usuario.query = function (cb) {
        return usuarioResource.query(function (data) {
                return cb(null, data);
            },
            function (err) {
                return cb(err);
            }).$promise;
    };

    usuario.get = function (data, cb) {
        return usuarioResource.get(data,
            function (data) {
                return cb(null, data);
            },
            function (err) {
                return cb(err);
            }).$promise;
    };

    usuario.save = function (data) {
        return usuarioResource.save(data,
            function (response) {
                return response.data;
            },
            function (err) {
                throw err.data.message;
            }).$promise;
    };

    return {
        get: usuario.get,
        query: usuario.query,
        save: usuario.save
    };
}

angular
    .module('electoralApp')
    .factory('usuario', factory);

factory.$inject = ['usuarioResource'];