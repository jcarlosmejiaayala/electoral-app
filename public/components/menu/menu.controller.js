(function () {
    'use strict';

    function controller($scope, $mdBottomSheet, $mdSidenav, $state) {
        var scope = this;
        this.items = [
            {
                name: 'usuario',
                icon: 'fa-user'
            },
            {
                name: 'casilla',
                icon: 'fa-archive'
            }
        ];
        this.displayMenuItems = function ($event) {
            if (scope.itemSelected) {
                $state.go(scope.itemSelected.toLowerCase());
                /*
                $mdBottomSheet
                    .show({
                        templateUrl: 'components/bottom-sheet/bottom-sheet.html',
                        controller: 'bottomSheetController',
                        controllerAs: 'bottom',
                        targetEvent: $event,
                        resolve: {
                            item: function () {
                                return scope.itemSelected;
                            }
                        }
                    })
                    .then(function (result) {
                        //result.toLowerCase();
                    });
                    */
            }
        };
        this.menuClose = function(){
            $mdSidenav('menu').close();
        };
    }

    angular
        .module('electoralApp')
        .controller('menuController', controller);

    controller.$inject = ['$scope', '$mdBottomSheet', '$mdSidenav', '$state'];
})();