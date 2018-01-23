(function() {
    'use strict';

    angular
        .module('phonebook')
        .filter('startFrom', startFrom);

        function startFrom() {
            return function(input, start) {
                start = +start;
                return input ? input.slice(start) : [];
            }
        }

})();
