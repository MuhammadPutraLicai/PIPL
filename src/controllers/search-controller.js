const {CardPemasokModel} = require('./../models/pemasok-model');

async function searchPerusahaanByName(namaPerusahaan) {
    const searchedPerusahaan = new CardPemasokModel();
    await searchedPerusahaan.createSearchedCard(namaPerusahaan);
    return searchedPerusahaan.cardList;
}

module.exports = {searchPerusahaanByName};