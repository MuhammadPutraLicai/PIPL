const {Pemasok} = require('./../models/pemasok-model');

class PemasokProfil{

    async showPemasokProfil(id, req, res){
        //retrieve pemasok data
        const pemasok = new Pemasok();
        await pemasok.getPemasokData("pemasok", id);

        //send pemasok data to views and render it
        res.render('profil-pemasok', {id:pemasok.id, data:pemasok.data});
    }
}

module.exports = PemasokProfil;