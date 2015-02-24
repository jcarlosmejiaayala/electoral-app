'use strict';

var controller = function ($location, menu) {
    this.isCollapsed = true;
    menu.get()
        .then(function (data) {
            this.menu = data;
        }.bind(this));

    this.isActive = function (route) {
        return (_.isEqual(route, $location.path()) && !_.isEqual(route, '/login'));
    };

    this.isLoggin = function (name) {
        return _.isEqual(name, 'Ingresar');
    };
};

angular
    .module('electoralApp')
    .controller('navbarController', controller);
controller.$inject = ['$location', 'menu'];