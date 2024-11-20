const {addDataCustomer, addDataBookmarks, getDataByEmailPassword} = require('./../../configs/db');

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
        const newCustomerId = await addDataCustomer(addedData);
        return newCustomerId;
    }

    async authenticateCustomer(email, password, coll = "customer"){
        const result = await getDataByEmailPassword(email, password, coll);//result = {id: 'doc_id', data: 'all doc data'}
        return result;
    }
}

//const percobaan = new Customer();
//percobaan.authenticateCustomer("merimerah@gmail.com", "1212").then((result)=>{console.log(result)});

module.exports = Customer;