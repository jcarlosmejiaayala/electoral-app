'use strict';

var controller = function ($scope, distritos) {
    this.distritos = distritos;

    $scope.$watchCollection('conteo.distrito', function(_new){
        if(_new){
            debugger;
        }
    })
};
angular
    .module('electoralApp')
    .controller('conteoController', controller);

controller.$inject = ['$scope', 'distritos'];