const {getDataById, updateDataById} = require('./../../configs/db');
const fs = require('fs');

class Produk{
    constructor(nama_barang=null, image=null, deskripsi=null){//parameter ini adalah javascript object
        this.nama_barang = nama_barang;
        this.image = image;
        this.deskripsi = deskripsi;
    }

    removeItem(array, nama_barang){
        return array.filter(item => item.nama_barang !== nama_barang);
    }

    getImageByNamaBarang(array, namaBarang){
        const item = array.find(item => item.nama_barang === namaBarang);
        return item ? item.image : null;
    }

    async deleteProduk(idDaftarProduk, deletedProdukName){
        let result = await getDataById("daftar_produk", idDaftarProduk);//get data from database
        //remove the image
        const imagePath = this.getImageByNamaBarang(result.data.produk, deletedProdukName);
        fs.unlink(`./${imagePath}`, function(err) {
            if (err) {
               return console.error(err);
            }
            console.log("File deleted successfully!");
        });
        //filter the data
        const filteredProduk = this.removeItem(result.data.produk, deletedProdukName);
        if (filteredProduk.length == 0) {
            await updateDataById("daftar_produk", idDaftarProduk, {produk:null}); 
            return 1;
        }else{
            await updateDataById("daftar_produk", idDaftarProduk, {produk:filteredProduk}); 
            return 1;
        }
        
        
    }

    async updateProduk(idDaftarProduk, newProdukData){
        //retrive produk
        let result = await getDataById("daftar_produk", idDaftarProduk);
        let currentProdukList = result.data.produk;
        if (currentProdukList){//true if not null
            currentProdukList.push(newProdukData);
        }else{//if null
            currentProdukList = [newProdukData];
        }
        //push to databasee
        await updateDataById("daftar_produk", idDaftarProduk, {produk: currentProdukList});
        return 1;
    }
}

class DaftarProduk{
    constructor(){
       this.daftar_produk = [];
    }
    
    async createDaftarProduk(id){
        const dataProduk = await getDataById("daftar_produk", id);
        if (dataProduk.data.produk) {//true if data produk has a list of produk in database
            dataProduk.data.produk.forEach(produk => {
                this.daftar_produk.push(new Produk(produk.nama_barang, produk.image, produk.deskripsi));
            });
            return this.daftar_produk;
        }else{
            this.daftar_produk = null;
            return this.daftar_produk;
        }
    }
}

module.exports = {DaftarProduk, Produk};

//below program for testing purpose
/*const coba = new DaftarProduk()
coba.createDaftarProduk("MoYONe3aQsdKXV4WMDxT").then((result)=>{
    console.log(result);
});
const coba = new Produk();
coba.deleteProduk('9h8BeR3F7iMzx8o8MuNf', 'Lontong Sayur').then(()=>{
    console.log("success");
});*/