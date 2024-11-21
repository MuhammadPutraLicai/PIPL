const {getDataById} = require('./../../configs/db');

class Produk{
    constructor(nama_barang, image, deskripsi){//parameter ini adalah javascript object
        this.nama_barang = nama_barang;
        this.image = image;
        this.deskripsi = deskripsi;
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

module.exports = {DaftarProduk};

//below program for testing purpose
/*const coba = new DaftarProduk()
coba.createDaftarProduk("MoYONe3aQsdKXV4WMDxT").then((result)=>{
    console.log(result);
});*/