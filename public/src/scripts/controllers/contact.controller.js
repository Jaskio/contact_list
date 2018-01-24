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
            vm.merge_list = {};
            vm.searchTerm = '';
            vm.currentPage = 0;
            vm.pageSize = 3;
            vm.mergeFormVisible = false;
            vm.mergeListVisible = false;
            vm.preparedToDelete = [];

            _init();

            function _init() {
                _getContacts(URL_ID);
                
                vm.addContact = _addContact;
                vm.updateContact = _updateContact;
                vm.deleteContact = _deleteContact;
                vm.showForm = _showForm;
                vm.mergeList = _mergeList;
                vm.mergeProcess = _mergeProcess;
            }

            function _showForm(contact) {
                vm.mergeFormVisible = true;
                vm.merged_contact = contact;
                vm.form_data = _newContact();

                vm.merged_contact.forEach(function(single_contact) {
                    vm.preparedToDelete.push(single_contact.id);
                });
            }


            function _mergeList() {
                vm.mergeListVisible = true;

                var sorted = _.orderBy(vm.contacts, ['first_name', 'last_name']),
                    results = [];

                for (var i = 0; i < sorted.length - 1; i++) {
                    if (sorted[i + 1].first_name == sorted[i].first_name &&
                        sorted[i + 1].last_name == sorted[i].last_name) {
                        results.push(sorted[i]);
                        results.push(sorted[i + 1]);
                    }
                }

                var uniq = _.uniq(results);

                vm.merge_list = _.groupBy(uniq, 'first_name');
                
                
            }


            function _mergeProcess() {
                var key_to_delete = '';

                Object.keys(vm.merge_list).forEach(function(key, index) {
                    vm.merge_list[key].map(function(contact_duped) {
                        if (contact_duped.id == vm.preparedToDelete[0]) {
                            key_to_delete = key;
                        }
                    });
                });
                
                delete vm.merge_list[key_to_delete];
                    
                // only way to make multiple delete request
                vm.preparedToDelete.forEach(function(id) {
                    _deleteContact(id);
                });

                _addContact();

                vm.preparedToDelete = [];
            }

            function _newContact() {
                return {
                    first_name: '',
                    last_name: '',
                    address: '',
                    postal_code: '',
                    city: '',
                    country: '',
                    phone: [],
                    email: ''
                }
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
                        _getContacts(null);
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

            function _deleteContact(id) {
                var provided_id = id || vm.form_data.id;

                ContactsService.deleteContact(provided_id)
                    .then(function(response) {
                        console.log(response);
                        _getContacts(null);
                    }, function(err) {
                        console.log(err);
                    });
            }
        };

})();
