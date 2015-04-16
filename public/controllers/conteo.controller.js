'use strict';

var controller = function ($scope, $timeout, distritos, usuario) {
    var that = this;
    this.distritos = distritos;
    this.distrito = distritos[0];
    this.chartConfig = {

        options: {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Última conteo registrado: ' + moment().format('hh:mm:ss DD/MM/YYYY')
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            }
        },

        size: {
            height: 600
        },
        credits: {
            enabled: false
        },
        loading: false,
        useHighStocks: false
    };

    function getSimpatizantesDistritos() {
        usuario.getSimpatizantesPorDistrito({distrito: that.distrito._id})
            .then(function (response) {
                that.graphSinDatos = !!(response.countVotos == 0 && response.countNoVotos == 0);
                that.chartConfig.options.title = {text: 'Última actualización: ' + moment().format('hh:mm:ss DD/MM/YYYY')};
                that.chartConfig.series = [{
                    name: 'Votaciones',
                    data: [['Votaron', response.countVotos], ['Sin votar', response.countNoVotos]]
                }];
                that.noVotosTotal = response.countNoVotos;
                that.simpatizantes = response.simpatizantes;
                $timeout(getSimpatizantesDistritos, 30000);
            });
    }

    getSimpatizantesDistritos();
};
angular
    .module('electoralApp')
    .controller('conteoController', controller);

controller.$inject = ['$scope', '$timeout', 'distritos', 'usuario'];