const {CardPemasokModel} = require('../models/pemasok-model');

function getCustomerMainPage(req, res) {
    //ambil beberapa data pemasok lalu masukkan ke views untuk ditampilkan di hal utama
    const listPemasok = new CardPemasokModel();
    listPemasok.createCardList().then(()=>{
        res.render('customer/customer-main-page', {dataPemasok: listPemasok.cardList})
    });
    
}

module.exports = {getCustomerMainPage};