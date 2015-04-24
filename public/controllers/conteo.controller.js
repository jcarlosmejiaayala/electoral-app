'use strict';

var controller = function ($scope, $timeout, $sessionStorage, distritos, usuario, distrito) {
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
    this.seeYaVotaron = !!(_.includes(['representante general', 'representante de casilla'], $sessionStorage.rol));
    this.todasSecciones = !($sessionStorage.rol == 'representante de casilla');
    function getSimpatizantesDistritos() {
        distrito.getVotantesPorSeccion(that.distrito._id, that.seccion._id)
            .then(function (response) {
                that.graphSinDatos = !!(response.countVotos == 0 && response.countNoVotos == 0);
                that.chartConfig.options.title = {text: 'Última actualización: ' + moment().format('hh:mm:ss DD/MM/YYYY')};
                that.chartConfig.series = [{
                    name: 'Votaciones',
                    data: [['Votaron', response.countVotos], ['Sin votar', response.countNoVotos]]
                }];
                that.noVotosTotal = response.countNoVotos;
                that.votosTotal = response.countVotos;
                that.simpatizantesNoVotos = _.filter(response.simpatizantes, {voto: false});
                that.simpatizantesVotos = _.reject(response.simpatizantes, {voto: false});
                $timeout(getSimpatizantesDistritos, 30000);
            });
    }

    $scope.$watchCollection('conteo.distrito', function (newVal) {
        if (newVal) {
            distrito.getSecciones(newVal._id)
                .then(function (response) {
                    that.secciones = response;
                    if (that.todasSecciones) {
                        that.secciones.unshift({
                            _id: 'todas',
                            numero: 'Todas Las Secciones'
                        });
                    }
                    that.seccion = that.secciones[0];
                });
        }
    });
    $scope.$watchCollection('conteo.seccion', function (newVal) {
        if (newVal) {
            getSimpatizantesDistritos();
        }
    });
};
angular
    .module('electoralApp')
    .controller('conteoController', controller);

controller.$inject = ['$scope', '$timeout', '$sessionStorage', 'distritos', 'usuario', 'distrito'];