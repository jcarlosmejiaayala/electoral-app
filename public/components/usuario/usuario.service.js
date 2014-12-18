(function () {
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

        usuario.get = function (cb) {
            return usuarioResource.get(
                function (data) {
                    return cb(null, data);
                },
                function (err) {
                    return cb(err);
                }).$promise;
        };

        return {
            get: usuario.get,
            query: usuario.query
        };
    }

    angular
        .module('electoralApp')
        .factory('usuario', factory);

    factory.$inject = ['usuarioResource'];
})();