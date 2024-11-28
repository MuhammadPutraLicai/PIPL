const {CardPemasokModel} = require('./../models/pemasok-model');

async function createFilteredPemasok(jenisPerusahaan, jenisProduk){
    const cardPemasok = new CardPemasokModel();
    await cardPemasok.createFilteredCardList(jenisPerusahaan, jenisProduk);
    return cardPemasok.cardList;
}

module.exports = {createFilteredPemasok};