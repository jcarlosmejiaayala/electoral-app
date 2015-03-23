'use strict';

var controller = function ($scope, $timeout, distritos, usuario) {
    var that = this;
    this.distritos = distritos;
    this.distrito = distritos[0];
    this.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },

        loading: false
    };

    function getSimpatizantesDistritos() {
        usuario.getSimpatizantesPorDistrito({distrito: that.distrito._id})
            .then(function (response) {
                if (!_.isEqual(that.simpatizantes, response.simpatizantes)) {
                        that.countVotos = response.countVotos;
                        that.countNoVotos = response.countNoVotos;
                        that.simpatizantes = response.simpatizantes;
                }
                // $timeout(getSimpatizantesDistritos(), 1000 *60);
            });
    }

    getSimpatizantesDistritos();
};
angular
    .module('electoralApp')
    .controller('conteoController', controller);

controller.$inject = ['$scope', '$timeout', 'distritos', 'usuario'];