const {addDataCustomer, addDataBookmarks} = require('./../../configs/db');

class Customer{
    constructor(id = null, nama = null, email = null, nomor_telepon = null){
        this.id = id;
        this.nama = nama;
        this.email = email;
        this.nomor_telepon = nomor_telepon;
        this.bookmark = null;
    }

    async createCustomer(addedData){
        //create new bookmark for the new customer
        const newCustomerBookmarkId = await addDataBookmarks();
        addedData['bookmark'] = newCustomerBookmarkId;
        addDataCustomer(addedData).then(()=>{console.log('success')});
    }
}

module.exports = Customer;