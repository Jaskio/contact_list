(function() {
    'use strict';

    angular
        .module('phonebook')
        .controller('ContactsController', ContactsController);

        ContactsController.$inject = [
            'ContactsService',
            '$route',
            '$location',
            '$timeout'
        ];

        function ContactsController(ContactsService, $route, $location, $timeout) {
            var vm = this;
            var URL_ID = $route.current.params.id;
    
            vm.contacts = [];
            vm.merge_list = {};
            vm.phone_number = '';
            vm.searchTerm = '';
            vm.currentPage = 0;
            vm.pageSize = 3;
            vm.mergeFormVisible = false;
            vm.mergeListVisible = false;
            vm.preparedToDelete = [];
            vm.confirmDelete = false;
            vm.successMessage = false;

            _init();

            /**
             * Init function
             */
            function _init() {
                _getContacts(URL_ID);
                vm.form_data = _newContact();
                
                vm.addContact = _addContact;
                vm.updateContact = _updateContact;
                vm.deleteContact = _deleteContact;
                vm.showForm = _showForm;
                vm.mergeList = _mergeList;
                vm.mergeProcess = _mergeProcess;
                vm.addPhone = _addPhone;
                vm.formValidation = _formValidation;
                vm.mergeValidation = _mergeValidation;
                vm.setURL = _setURL;
            }

            /**
             * After merge list is populated this function is called when we 
             * need to display merge contact information
             * 
             * @param {Object} contact 
             */
            function _showForm(contact) {
                vm.mergeFormVisible = true;
                vm.merged_contact = contact;
                vm.phone_numbers = [];
                vm.form_data = _newContact();

                vm.merged_contact.forEach(function(single_contact) {
                    vm.preparedToDelete.push(single_contact.id);
                    single_contact.phone.forEach(function(phone) {
                        vm.phone_numbers.push(phone);
                    });
                });
            }

            /**
             * Slide animation on opening merge list
             */
            function _slideToElement() {
                $('html, body').animate({
                    scrollTop: $('.row').offset().top
                }, 700);
            }

            /**
             * Set proper url
             * 
             * @param {String} path 
             */
            function _setURL(path) {
                $location.path(path)
            }

            /**
             * Function is used to generate and show list of contacts 
             * available for merging
             */
            function _mergeList() {
                vm.mergeListVisible = true;
                _slideToElement();
    
                var sorted = _.orderBy(vm.contacts, ['first_name', 'last_name']),
                    results = [];

                for (var i = 0; i < sorted.length - 1; i++) {
                    if (sorted[i + 1].first_name == sorted[i].first_name &&
                        sorted[i + 1].last_name == sorted[i].last_name) {
                        results.push(sorted[i]);
                        results.push(sorted[i + 1]);
                        vm.haveMergeList = true;
                    }
                }

                var uniq = _.uniq(results);
                vm.merge_list = _.groupBy(uniq, 'first_name');
            }

            /**
             * Final stage of merging is done here, newly merged contact is 
             * removed from current merge list 
             */
            function _mergeProcess() {
                var key_to_delete = '';

                Object.keys(vm.merge_list).forEach(function(key, index) {
                    vm.merge_list[key].map(function(contact_duped) {
                        if (contact_duped.id == vm.preparedToDelete[0]) {
                            key_to_delete = key;
                        }
                    });
                });
                
                vm.form_data.first_name = vm.merge_list[key_to_delete][0].first_name;
                vm.form_data.last_name = vm.merge_list[key_to_delete][0].last_name;

                var phone_numbers = [];
                vm.form_data.phone.forEach(function(phone) {
                    phone_numbers.push(JSON.parse(phone));
                });

                vm.form_data.phone = phone_numbers;
                
                delete vm.merge_list[key_to_delete];
    
                // only way to make multiple delete request
                vm.preparedToDelete.forEach(function(id) {
                    _deleteContact(id);
                });

                // timeout is needed because of multiple delete requests
                $timeout(function() {
                    _addContact();
                    vm.preparedToDelete = [];
                    vm.mergeFormVisible = false;
                }, 800);
            }

            /**
             * Helper function for creating new form data object
             */
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

            /**
             * Is used to create array of newly created phone numbers
             */
            function _addPhone() {
                vm.form_data.phone.push(
                    {number: vm.phone_number}
                );

                vm.phone_number = '';
            }

            /**
             * Validation for main forms - Insert and Edit
             */
            function _formValidation() {
                var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (vm.form_data.first_name === '' ||
                    vm.form_data.last_name === '' ||
                    vm.form_data.address === '' ||
                    vm.form_data.postal_code === '' ||
                    vm.form_data.city === '' ||
                    vm.form_data.country === '' ||
                    !regex.test(vm.form_data.email) ||
                    vm.form_data.phone.length === 0) {

                    return true;
                }
            }

            /**
             * Validation for merge form
             */
            function _mergeValidation() {
                if (vm.form_data.address === '' ||
                    vm.form_data.postal_code === '' ||
                    vm.form_data.city === '' ||
                    vm.form_data.country === '' ||
                    vm.form_data.email === '' ||
                    vm.form_data.phone.length === 0) {

                    return true;
                }
            }

            /**
             * Get all contacts or specific one - if id is defined
             * 
             * @param {Integer} id 
             */
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

            /**
             * Insert new contact into storage
             */
            function _addContact() {
                ContactsService.addContact(vm.form_data)
                    .then(function(response) {
                        console.log(response);
                        vm.successMessage = true;
                        $timeout(function() {
                            vm.successMessage = false;
                            vm.form_data = _newContact();
                        }, 1500);
                        _getContacts(null);
                    }, function(err) {
                        console.log(err);
                    });
            }

            /**
             * Update current contact
             */
            function _updateContact() {
                ContactsService.updateContact(vm.form_data)
                    .then(function(response) {
                        console.log(response);
                        vm.successMessage = true;
                        $timeout(function() {vm.successMessage = false;}, 1500);
                        _getContacts(null);
                    }, function(err) {
                        console.log(err);
                    });
            }

            /**
             * Delete existing contact
             * 
             * @param {Integer} id 
             */
            function _deleteContact(id) {
                var provided_id = id || vm.form_data.id;

                ContactsService.deleteContact(provided_id)
                    .then(function(response) {
                        console.log(response);
                        _getContacts(null);
                        vm.confirmDelete = false;
                    }, function(err) {
                        console.log(err);
                    });
            }
        };

})();
