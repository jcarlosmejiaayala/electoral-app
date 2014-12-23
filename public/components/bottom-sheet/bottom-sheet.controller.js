(function () {
    'use strict';
    function controller($scope, $mdBottomSheet, item) {
        var scope = this;
        this.selectedItem = item;
        this.items = {
            usuario: [
                {name: 'Share', icon: 'fa-user'},
                {name: 'Upload', icon: 'fa-upload'},
                {name: 'Copy', icon: 'fa-copy'},
                {name: 'Print this page', icon: 'fa-print'}
            ],
            casilla: [
                {name: 'Share', icon: 'fa-user'},
                {name: 'Upload', icon: 'fa-upload'},
                {name: 'Copy', icon: 'fa-copy'}
            ]
        };
        this.listItemClick = function ($index) {
            $mdBottomSheet.hide(scope.items[scope.selectedItem][$index].name);
        };
    }

    angular
        .module('electoralApp')
        .controller('bottomSheetController', controller);

    controller.$inject = ['$scope', '$mdBottomSheet', 'item'];
})();