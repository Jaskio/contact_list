(function() {
    'use strict';

    angular
        .module('phonebook')
        .directive('siteNavigation', siteNavigation);

        function siteNavigation() {
            var directive = {
                restrict: 'E',
                scope: {
                    back: '@back',
                    forward: '@forward'
                },
                templateUrl: 'dist/views/site_navigation.html',
                controller: NavigationController,
                controllerAs: 'NC',
                bindToController: true,
                link: linkFn
            };

            return directive;
        }

        function linkFn(scope, element, attrs) {
            angular.element(element[0].childNodes[0]).on('click', function() {
                history.back();
                scope.$apply();
            });

            angular.element(element[0].childNodes[1]).on('click', function() {
                history.forward();
                scope.$apply();
            });
        }

        NavigationController.$inject = [
            '$scope'
        ];

        function NavigationController($scope) {
            var vm = this;
        }
})();
