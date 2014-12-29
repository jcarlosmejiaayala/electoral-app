(function () {
    'use strict';

    function factory($window) {
        var _ = $window._;
        _.mixin(_.str.exports());
        delete($window._);

        return (_);
    }

    angular
        .module('electoralApp')
        .factory('_', factory);

    factory.$inject = ['$window'];
})();