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
                .when('/', {
                    templateUrl: 'dist/views/contacts.html',
                    controller: 'ContactsController',
                    controllerAs: 'CC'
                })
                .when('/contact/add', {
                    templateUrl: 'dist/views/add_contact.html',
                    controller: 'ContactsController',
                    controllerAs: 'CC'
                })
                .when('/contact/:id/edit', {
                    templateUrl: 'dist/views/edit_contact.html',
                    controller: 'ContactsController',
                    controllerAs: 'CC'
                })
                .when('/contact/:id/delete', {
                    templateUrl: 'dist/views/delete_contact.html',
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
