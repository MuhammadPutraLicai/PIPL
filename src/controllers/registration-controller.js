const Customer = require('./../models/customer-model');

class Registration{
    createNewCustomer(customerData) {
        const newCustomerData = {
            nama : customerData['nama'],
            email : customerData['email'],
            nomor_telepon : customerData['nomor_telepon'],
            password : customerData['kata_sandi'],
            bookmark : null
        };

        const newCustomer = new Customer();
        newCustomer.createCustomer(newCustomerData);
    }
}

module.exports = Registration;

