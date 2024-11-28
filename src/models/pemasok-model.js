const {getAllData, addDataBookmarks, getDataById,
       addDataDaftarProduk, addDataPemasok, getDataByEmailPassword,
      updateDataById, getDataPemasokByQuery, getDataPemasokByName} = require('../../configs/db');

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

    async updatePemasokData(coll, docId, data){
        await updateDataById(coll, docId, data);
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
    constructor(id = null, data = null){
        if(id){
            this.id = id;
            this.linkLogo = data.link_logo;
            this.namaPerusahaan = data.nama_perusahaan;
            this.jenisPerusahaan = data.jenis_perusahaan;
            this.jenisProduk = data.jenis_produk;
            this.deskripsi = extractFirstTwentyWords(data.deskripsi);            
        }

    }

    async getCardPemasok(idPemasok){
        const cardData = {};
        const result = await getDataById("pemasok", idPemasok);
        cardData['id'] = result.id;
        cardData['link_logo'] = result.data['link_logo']; 
        cardData['nama_perusahaan'] = result.data['nama_perusahaan'];
        cardData['jenis_perusahaan'] = result.data['jenis_perusahaan'];
        cardData['jenis_produk'] = result.data['jenis_produk'];
        cardData['deskripsi'] = extractFirstTwentyWords(result.data['deskripsi']);
        return cardData;
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

    async createFilteredCardList(jenisPerusahaan, jenisProduk){
        const dataList = await getDataPemasokByQuery(jenisPerusahaan, jenisProduk);
        if(dataList){
           for (let i = 0; i < dataList.length; i++) {
            //buat instance dari kelas CardPemasok lalu masukkan ke dalam array cardList
            let temp = {
                id : dataList[i].id,
                linkLogo : dataList[i].data.link_logo,
                namaPerusahaan : dataList[i].data.nama_perusahaan,
                jenisPerusahaan : dataList[i].data.jenis_perusahaan,
                jenisProduk : dataList[i].data.jenis_produk,
                deskripsi : extractFirstTwentyWords(dataList[i].data.deskripsi) 
            }
            this.cardList.push(temp);
            } 
        }else{
            this.cardList = null;
        }
        return 1;
    }

    async createSearchedCard(namaPerusahaan){
        const dataList = await getDataPemasokByName(namaPerusahaan);
        if (dataList){
            for (let i = 0; i < dataList.length; i++) {
                //buat instance dari kelas CardPemasok lalu masukkan ke dalam array cardList
                let temp = {
                    id : dataList[i].id,
                    linkLogo : dataList[i].data.link_logo,
                    namaPerusahaan : dataList[i].data.nama_perusahaan,
                    jenisPerusahaan : dataList[i].data.jenis_perusahaan,
                    jenisProduk : dataList[i].data.jenis_produk,
                    deskripsi : extractFirstTwentyWords(dataList[i].data.deskripsi) 
                }
                this.cardList.push(temp);
            }
        }else{
            this.cardList = null;
        }
        return 1;
    }
}

module.exports = {CardPemasokModel, Pemasok, CardPemasok};

/*below program is for testing purpose 
const coba = new Pemasok();
coba.getPemasokData("pemasok","1").then(()=>{
    console.log(coba.id);
    console.log(coba.data);
});*/

/*const coba = new CardPemasok();
coba.getCardPemasok("1").then((result)=>{
    console.log(result);
});*/