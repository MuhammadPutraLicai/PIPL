const express = require('express');
const search = express.Router();
const {searchPerusahaanByName} = require('./../src/controllers/search-controller');

search.post('/search-nama-perusahaan', async (req, res)=>{
    const namaPerusahaan = req.body.name;
    let result = await searchPerusahaanByName(namaPerusahaan);
    res.json({message:result});
});

module.exports = search;