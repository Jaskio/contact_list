(function(){
    'use strict';

    angular
        .module('phonebook')
        .service('ContactsService', ContactsService);

        ContactsService.$inject = ['$q', '$http'];

        function ContactsService($q, $http) {
            var service = {};
            var ENDPOINT_PATH = 'contacts';

            _init();

            function _init() {
                service.getContacts = _getContacts;
            }

            
            function _getContacts(id) {
                var defer = $q.defer();
                var provided_id = id || null;

                console.log(provided_id);

                // $http.post(ENDPOINT_PATH + '/get', {id: provided_id})
                //     .then(function(response) {
                //         defer.resolve(response.data);
                //     }, function(err) {
                //         defer.reject(err.data);
                //     });

                // return defer.promise;
            }

            return service;
        };
})();
