'use strict';

var factory = function ($resource) {
    return $resource('/estados/:estado');
};
angular
    .module('electoralApp')
    .factory('estadosResource', factory);

factory.$inject = ['$resource'];