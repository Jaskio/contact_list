(function() {
    "use strict";

    angular
        .module('phonebook', [
            'ngRoute'
        ]);

    angular
        .module('phonebook')
        .config(config)
        .run(runFn);

        config.$inject = [
            '$routeProvider', 
            '$locationProvider'
        ];

        function config($routeProvider, $locationProvider){

            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/contacts', {
                    templateUrl: 'dist/views/test.html',
                    controller: 'ContactsController',
                    controllerAs: 'CC'
                })
        };

        runFn.$inject = [
            '$location',
            '$rootScope'
        ];

        function runFn($location, $rootScope) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {

            });
        };
})();
