(function() {
    'use strict';

    angular
        .module('phonebook')
        .filter('search', search);

        function search() {
            return function(contacts, term) {
                var filtered_contacts = [];

                contacts.forEach(function(contact) {
                    if (contact.first_name.toLowerCase().startsWith(term.toLowerCase()) ||
                        contact.last_name.toLowerCase().startsWith(term.toLowerCase()) ||
                        contact.email.toLowerCase().startsWith(term.toLowerCase())) {

                        filtered_contacts.push(contact);
                    } else {
                        contact.phone.forEach(function(phone) {
                            if (phone.number.toLowerCase().startsWith(term.toLowerCase())) {
                                filtered_contacts.push(contact);
                            }
                        });
                    }
                });
                
                return filtered_contacts;
            }
        }

})();
