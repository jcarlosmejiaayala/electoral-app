(function(){
    'use strict';
    function run($rootScope){
        _.mixin(_.str.exports());
        $rootScope._ = _;
    }
    function config(){

    }
    angular
        .module('electoralApp',[
            'ngResource',
            'ngTouch',
            'ngStorage',
            'btford.socket-io',
            'ui.router',
            'ui.bootstrap',
            'highcharts-ng'
        ])
        .run(['$rootScope', run])
        .config(config);
})();