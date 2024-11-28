const express = require('express');
const {createFilteredPemasok} = require('./../src/controllers/filter-controller');
const filter = express.Router();

filter.post('/filter-supplier', async (req, res)=>{
    const jenisPerusahaan = req.body.jenis_perusahaan;
    const jenisProduk = req.body.jenis_produk;
    const filteredPemasok = await createFilteredPemasok(jenisPerusahaan, jenisProduk);
    res.json({message: filteredPemasok});
});

module.exports = filter;