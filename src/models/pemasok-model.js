const {getAllData, addDataBookmarks, getDataById,
       addDataDaftarProduk, addDataPemasok, getDataByEmailPassword} = require('../../configs/db');

class Pemasok{//merepresentasikan halaman profil pemasok
    constructor(){
        this.id = null;
        this.data = {};
    }

    async createPemasok(addedData){
        //bikin dokumen bookmark untuk akun pemasok baru
        const newPemasokBookmarkId = await addDataBookmarks();
        const newPemasokDaftarProdukId = await addDataDaftarProduk();
        addedData['bookmark'] = newPemasokBookmarkId;
        addedData['daftar_produk'] = newPemasokDaftarProdukId;
        const newPemasokId = await addDataPemasok(addedData);
        return newPemasokId;
    }

    async authenticatePemasok(email, password, coll = "pemasok"){
        const result = await getDataByEmailPassword(email, password, coll);//expected result = {id: 'doc_id', data: 'all doc data'}
        return result;
    }

    async getPemasokData(coll = "pemasok", id){
        const result = await getDataById(coll, id);
        this.id = result.id;
        this.data = result.data;
        return 1;
    }
}

function extractFirstTwentyWords(str) {
    // Trim any leading or trailing whitespace
    const trimmedStr = str.trim();
    
    // If the string is empty, return an empty string
    if (!trimmedStr) return '';
    
    // Split the string into words
    const words = trimmedStr.split(/\s+/);
    
    // If the number of words is 20 or less, return the original string
    if (words.length <= 20) return trimmedStr;
    
    // Extract the first 20 words and join them back together
    const extractedWords = words.slice(0, 20);
    return extractedWords.join(' ');
}

class CardPemasok{//merepresentasikan satu kartu pemasok pada halaman utama
    constructor(id, data){
        this.id = id;
        this.linkLogo = data.link_logo;
        this.namaPerusahaan = data.nama_perusahaan;
        this.jenisPerusahaan = data.jenis_perusahaan;
        this.jenisProduk = data.jenis_produk;
        this.deskripsi = extractFirstTwentyWords(data.deskripsi);
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

module.exports = {CardPemasokModel, Pemasok};

/*below program is for testing purpose 
const coba = new Pemasok();
coba.getPemasokData("pemasok","1").then(()=>{
    console.log(coba.id);
    console.log(coba.data);
});*/