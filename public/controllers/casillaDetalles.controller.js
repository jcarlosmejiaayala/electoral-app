'use strict';

var controller = function ($modalInstance, casillas, pagination, selects, casilla) {
    var that = this;
    this.casillas = casillas.casillas;
    this.total = casillas.total;
    this.filtradas = casillas.casillas.length;
    this.isBusy = false;
    if (!pagination.skip) {
        pagination.skip = 50;
    }
    this.detalles = function () {
        if (!_.isEqual(that.filtradas, that.total)) {
            that.isBusy = true;
            casilla.get(_.merge({selects: selects}, {filters: pagination}))
                .then(function (response) {
                    that.isBusy = false;
                    pagination.skip += 50;
                    that.filtradas += response.casillas.length;
                    that.total = response.total;
                    _.forEach(response.casillas, function (item) {
                        that.casillas.push(item);
                    });
                }).catch(function () {
                    that.isBusy = false;
                });
        }
    };
};

angular
    .module('electoralApp')
    .controller('casillaDetalles', controller);

controller.$inject = ['$modalInstance', 'casillas', 'pagination', 'selects', 'casilla'];