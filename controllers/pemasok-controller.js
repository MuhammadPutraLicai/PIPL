const {CardPemasokModel} = require('./../models/pemasok-model');

//ambil beberapa data pemasok lalu masukkan ke views untuk ditampilkan di hal utama
function getPemasokCardList(req, res) {
    const listPemasok = new CardPemasokModel();
    listPemasok.createCardList().then(()=>{
        res.render('hal-utama-pemasok', {dataPemasok: listPemasok.cardList})
    });
    
}

module.exports = {getPemasokCardList};