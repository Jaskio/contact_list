(function() {
    'use strict';

    angular
        .module('phonebook')
        .service('ContactsService', ContactsService);

        ContactsService.$inject = ['$q', '$http'];

        function ContactsService($q, $http) {
            var service = {};
            var ENDPOINT_PATH = 'http://localhost:3000/';

            _init();

            function _init() {
                service.getContacts = _getContacts;
            }

            
            function _getContacts(id) {
                var defer = $q.defer();
                var provided_id = id || null;

                $http.put(ENDPOINT_PATH + 'contacts/2', {
                        name: "third name 5"
                    })
                    .then(function(response) {
                        defer.resolve(response.data);
                    }, function(err) {
                        defer.reject(err.data);
                    });

                return defer.promise;
            }

            return service;
        };
})();
