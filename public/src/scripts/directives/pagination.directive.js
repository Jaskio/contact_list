(function() {
    'use strict';

    angular
        .module('phonebook')
        .directive('pagination', pagination);

        function pagination() {
            var directive = {
                restrict: 'E',
                scope: {
                    items: '=',
                    pageSize: '=',
                    currentPage: '='
                },
                templateUrl: 'dist/views/pagination.html',
                controller: PaginationController,
                controllerAs: 'PGC',
                bindToController: true,
                link: linkFn
            };

            return directive;
        }

        function linkFn(scope, element, attrs) {}

        PaginationController.$inject = [
            '$scope'
        ];

        function PaginationController($scope) {
            var vm = this;

            /**
             * Watches the items variable, and calls for _paginationSetup() function when the variable
             * changes the value
             */
            $scope.$watch(function () {
                return vm.items;
            }, function(current, original) {
                if (current.length) 
                    _paginationSetup();
            });

            /**
             * Watches the vm.pageSize, and calls for _paginationSetup() function when the variable
             * changes the value
             */
            $scope.$watch(function () {
                return vm.pageSize;
            }, _paginationSetup);

            /**
             * Sets current page
             * 
             * @param {[Integer]} page [current page number]
             */
            vm.setPage = function(page) {
                vm.currentPage = page;
            };

            /**
             * Generates an array of numbers, which represent pages
             * 
             * @param  {[Integer]} no_of_pages [Number of pages to be generated]
             */
            vm.generatePages = function(no_of_pages) {
                var pages = [];
                for (var i = 1; i <= no_of_pages; i++) {
                    pages.push(i);
                }
                return pages;
            };

            /**
             * Sets the maximum number of pages based on array length
             */
            function _paginationSetup() {
                vm.maxPages = Math.ceil(vm.items.length / vm.pageSize);
                if (vm.items.length / vm.pageSize < 1 &&
                    vm.items.length / vm.pageSize > 0) {
                    vm.maxPages = 1;
                }
                if(vm.items.length == 0) vm.maxPages = 0;
            }
        }
})();
