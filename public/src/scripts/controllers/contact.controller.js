(function() {
    'use strict';

    angular
        .module('phonebook')
        .controller('ContactsController', ContactsController);

        ContactsController.$inject = [
            'ContactsService'
        ];

        function ContactsController(ContactsService) {
            var vm = this;

            _init();

            function _init() {
                _getContacts();

                vm.getContacts = _getContacts;
            }

            function _getContacts() {
                ContactsService.getContacts()
                    .then(function(response) {
                        console.log(response);
                    }, function(err) {
                        console.log(err);
                    });
            }
        };
})();
