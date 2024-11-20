const {Pemasok} = require('./../models/pemasok-model');
const Customer = require('./../models/customer-model');

class Login{
    constructor(){
        this.userAuth = null;
        this.userId = null;
        this.userData = {};
    }

    async authPemasok(email, password, coll = "pemasok"){
        const pemasokInDataBase = new Pemasok();
        const loginResult = await pemasokInDataBase.authenticatePemasok(email, password);
        if (loginResult) {//if user data is found on data else
            this.userAuth = 1;
            this.userId = loginResult.id;
            this.userData['bookmark'] = loginResult.data['bookmark'];
            this.userData['daftar_produk'] = loginResult.data['daftar_produk'];
        }else{
            this.userAuth = 0;
        }
    }

    async authCustomer(email, password, coll = "customer"){
        const customerInDataBase = new Customer();
        const loginResult = await customerInDataBase.authenticateCustomer(email, password);
        if (loginResult) {//if user data is found on data else
            this.userAuth = 1;
            this.userId = loginResult.id;
            this.userData['bookmark'] = loginResult.data['bookmark'];
        }else{
            this.userAuth = 0;
        }
    }
}

module.exports = Login;
//the below code for testing purpose
/*const percobaan = new Login();
percobaan.authCustomer("merpatimerah@gmail.com", "1212").then(()=>{
    console.log(percobaan.userAuth);
    console.log(percobaan.userId);
    console.log(percobaan.userData);
});

const percobaan = new Login();
percobaan.authPemasok("budi@kreasi.co.id", "password123").then(()=>{
    console.log(percobaan.userAuth);
    console.log(percobaan.userId);
    console.log(percobaan.userData);
});*/