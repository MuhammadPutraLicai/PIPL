const {getAllData} = require('./../configs/db');

class Pemasok{//merepresentasikan halaman profil pemasok
    constructor(id, data){
        this.id = id;
        this.deskripsi = data.deskripsi;
        this.nomorTelepon = data.nomor_telepon;
        this.alamat = data.alamat;
        this.linkLogo = data.link_logo;
        this.jenisPerusahaan = data.jenis_perusahaan;
        this.jenisProduk = data.jenis_produk;
        this.linkWebsite = data.link_website;
        this.email = data.email;
        this.tahunDiidirikan = data.tahun_didirikan;
        this.owner = data.owner;
        this.namaPerusahaan = data.nama_perusahaan;
        this.bookmark = data.bookmark;
        this.catalog = data.catalog;
    }
}

class CardPemasok{//merepresentasikan satu kartu pemasok pada halaman utama
    constructor(id, data){
        this.id = id;
        this.linkLogo = data.link_logo;
        this.namaPerusahaan = data.nama_perusahaan;
        this.jenisPerusahaan = data.jenis_perusahaan;
        this.jenisProduk = data.jenis_produk;
        this.deskripsi = data.deskripsi;
    }
}

class CardPemasokModel{//merepresentasikan daftar - daftar kartu yang ditampilkan pada halaman utama
    constructor(){
        this.cardList = [];
    }

    async createCardList(){
        const dataList = await getAllData("pemasok");//ambil data pemasok dari database
        for (let i = 0; i < dataList.length; i++) {
            //buat instance dari kelas CardPemasok lalu masukkan ke dalam array cardList
            let temp = new CardPemasok(dataList[i].id, dataList[i].data);
            this.cardList.push(temp);
        }
    }
}

module.exports = {CardPemasokModel};