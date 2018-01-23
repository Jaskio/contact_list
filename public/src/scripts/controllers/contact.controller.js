(function() {
    'use strict';

    angular
        .module('phonebook')
        .controller('ContactsController', ContactsController);

        ContactsController.$inject = [
            'ContactsService',
            '$route'
        ];

        function ContactsController(ContactsService, $route) {
            var vm = this;
            var URL_ID = $route.current.params.id;
    
            vm.contacts = [];
            vm.form_data = {};
            vm.searchTerm = '';

            _init();

            function _init() {
                _getContacts(URL_ID);

                vm.addContact = _addContact;
                vm.updateContact = _updateContact;
                vm.deleteContact = _deleteContact;
            }

            function _getContacts(id) {
                ContactsService.getContacts(id)
                    .then(function(response) {
                        if (id) {
                            vm.form_data = response;
                        } else {
                            vm.contacts = response;
                        }
                    }, function(err) {
                        console.log(err);
                    });
            }

            function _addContact() {
                ContactsService.addContact(vm.form_data)
                    .then(function(response) {
                        console.log(response);
                    }, function(err) {
                        console.log(err);
                    });
            }

            function _updateContact() {
                ContactsService.updateContact(vm.form_data)
                    .then(function(response) {
                        console.log(response);
                    }, function(err) {
                        console.log(err);
                    });
            }

            function _deleteContact() {
                ContactsService.deleteContact(vm.form_data.id)
                    .then(function(response) {
                        console.log(response);
                    }, function(err) {
                        console.log(err);
                    });
            }
        };
})();
