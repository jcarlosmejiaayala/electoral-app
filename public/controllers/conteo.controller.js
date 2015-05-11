'use strict';

var controller = function ($scope, $timeout, $sessionStorage, distritos, usuario, distrito) {
    var that = this,
        timer;
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
    this.seeYaVotaron = !_.includes(['representante general', 'representante de casilla'], $sessionStorage.perfil.rol);
    this.todasSecciones = !($sessionStorage.perfil.rol == 'representante de casilla');
    function getSimpatizantesDistritos() {
        distrito.getVotantesPorSeccion(that.distrito._id, that.seccion._id)
            .then(function (response) {
                that.graphSinDatos = !!(response.countVotos == 0 && response.countNoVotos == 0);
                that.chartConfig.options.title = {text: 'Última actualización: ' + moment().format('hh:mm:ss DD/MM/YYYY')};
                that.chartConfig.series = [{
                    name: 'Total',
                    point: {
                        events: {
                            legendItemClick: function () {
                                return false;
                            }
                        }
                    },
                    data: [['Votaron', response.countVotos], ['Faltan', response.countNoVotos]]
                }];
                that.simpatizantesNoVotos = response.simpatizantesNoVotos;
                that.noVotosTotal = response.countNoVotos;
                if (_.includes(['administrador', 'candidato'], $sessionStorage.perfil.rol)) {
                    that.votosTotal = response.countVotos;
                    that.simpatizantesVotos = response.simpatizantesVotos;
                }
                timer = $timeout(getSimpatizantesDistritos, 30000);
            });
    }

    this.checkDiputacion = function (puesto) {
        return /^Dip/.test(puesto);
    };

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
            $timeout.cancel(timer);
            getSimpatizantesDistritos();
        }
    });

    $scope.$on('$destroy', function () {
        $timeout.cancel(timer);
    });
};
angular
    .module('electoralApp')
    .controller('conteoController', controller);

controller.$inject = ['$scope', '$timeout', '$sessionStorage', 'distritos', 'usuario', 'distrito'];