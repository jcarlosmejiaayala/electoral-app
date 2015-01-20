(function () {
    'use strict';

    function controller(usuario) {
        this.slideImages = [
            {
                image: 'vote.jpg',
                message: 'Este es un texto de ejemplo',
                link: '/suscribirse'
            },
            {
                image: 'vote.jpg',
                message: 'Este es un texto de ejemplo'
            }];
        this.intervalCarousel = 5000;
    }

    angular
        .module('electoralApp')
        .controller('mainController', controller);

    controller.$inject = ['usuario'];
})();