const {Pemasok} = require('./../models/pemasok-model');
const {DaftarProduk} = require('./../models/produk-model');
class PemasokProfil{

    async showPemasokProfil(pemasokId, req, res){
        //retrieve pemasok data
        const pemasok = new Pemasok();
        await pemasok.getPemasokData("pemasok", pemasokId);

        //retrieve daftar produk pemasok 
        const pemasokProduk = new DaftarProduk();
        //pemasok.data.daftar_produk berisi id dari dokumen di dalam collection daftar_produk
        const produk = await pemasokProduk.createDaftarProduk(pemasok.data.daftar_produk);
        //send pemasok data to views and render it
        res.render('profil-pemasok', {id:pemasok.id, data:pemasok.data, produk_list:produk});
        return 1;
    }
}

module.exports = PemasokProfil;