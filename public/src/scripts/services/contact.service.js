(function() {
    'use strict';

    angular
        .module('phonebook')
        .service('ContactsService', ContactsService);

        ContactsService.$inject = ['$q', '$http'];

        function ContactsService($q, $http) {
            var service = {};
            var ENDPOINT_PATH = 'http://localhost:3000/contacts/';

            _init();

            function _init() {
                service.getContacts = _getContacts;
                service.addContact = _addContact;
                service.updateContact = _updateContact;
                service.deleteContact = _deleteContact;
            }

            /**
             * Send request with specific id or empty string for all contacts
             * 
             * @param {Integer} id 
             */
            function _getContacts(id) {
                var defer = $q.defer();
                var provided_id = id || '';

                $http.get(ENDPOINT_PATH + provided_id)
                    .then(function(response) {
                        defer.resolve(response.data);
                    }, function(err) {
                        defer.reject(err.data);
                    });

                return defer.promise;
            }

            /**
             * Send data with newly created contact
             * 
             * @param {Object} data 
             */
            function _addContact(data) {
                var defer = $q.defer();

                $http.post(ENDPOINT_PATH, data)
                    .then(function(response) {
                        defer.resolve(response.data);
                    }, function(err) {
                        defer.reject(err.data);
                    });

                return defer.promise;
            }

            /**
             * Send data to update current contact
             * 
             * @param {Object} data 
             */
            function _updateContact(data) {
                var defer = $q.defer();

                $http.put(ENDPOINT_PATH + data.id, data)
                    .then(function(response) {
                        defer.resolve(response.data);
                    }, function(err) {
                        defer.reject(err.data);
                    });

                return defer.promise;
            }

            /**
             * Send specific id to perform delete operation
             * 
             * @param {Integer} id 
             */
            function _deleteContact(id) {
                var defer = $q.defer();

                $http.delete(ENDPOINT_PATH + id)
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
