(function(){
    'use strict';

    function factory(){
        this.isCollapsed = true;
    }
    angular
        .module('electoralApp')
        .factory('User', factory);
})();