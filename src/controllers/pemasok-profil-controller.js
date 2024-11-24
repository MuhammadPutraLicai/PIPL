const {Pemasok} = require('./../models/pemasok-model');
const {DaftarProduk} = require('./../models/produk-model');
class PemasokProfil{

    removeEmptyStrings(obj) {
        // Create a new object to store non-empty values
        const cleanObj = {};
        
        // Loop through original object
        Object.entries(obj).forEach(([key, value]) => {
            // Only keep properties where value is not an empty string
            if (value !== '') {
                cleanObj[key] = value;
            }
        });
        
        return cleanObj;
    }

    async showPemasokProfil(pemasokId, req, res){
        //retrieve pemasok data
        const pemasok = new Pemasok();
        console.log("\n\na user is trying to see pemasok profile\n");
        await pemasok.getPemasokData("pemasok", pemasokId);

        //retrieve daftar produk pemasok 
        const pemasokProduk = new DaftarProduk();
        //pemasok.data.daftar_produk berisi id dari dokumen di dalam collection daftar_produk
        const produk = await pemasokProduk.createDaftarProduk(pemasok.data.daftar_produk);
        //send pemasok data to views and render it
        res.render('profil-pemasok', {
            id:pemasok.id, 
            data:pemasok.data, 
            produk_list:produk,
            role : req.session.role,
            edit : false
        });
        return 1;
    }

    async showPemasokProfilEdit(pemasokId, req, res){//tampilkan hal utama pemasok dengan tombol edit
        //retrieve pemasok data
        const pemasok = new Pemasok();
        console.log("\n\na user is trying to see pemasok profile\n");
        await pemasok.getPemasokData("pemasok", pemasokId);

        //retrieve daftar produk pemasok 
        const pemasokProduk = new DaftarProduk();
        //pemasok.data.daftar_produk berisi id dari dokumen di dalam collection daftar_produk
        const produk = await pemasokProduk.createDaftarProduk(pemasok.data.daftar_produk);
        //send pemasok data to views and render it
        res.render('profil-pemasok', {
            id:pemasok.id, 
            data:pemasok.data, 
            produk_list:produk,
            role : req.session.role,
            edit : true
        });
        return 1;
    }

    async updatePemasokProfil(req, res){
        const docId = req.cookies.userId;
        const coll = "pemasok";
        const data = this.removeEmptyStrings(req.body);
        const pemasok = new Pemasok();
        await pemasok.updatePemasokData(coll, docId, data);
        return 1;
    }
}

module.exports = PemasokProfil;