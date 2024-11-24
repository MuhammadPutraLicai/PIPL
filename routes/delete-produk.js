const express = require('express');
const {Produk} = require('./../src/models/produk-model');
const deleteProduk = express.Router();//delete-produk

deleteProduk.get('/:namaProduk', async(req, res)=>{
    const deletedProduk = req.params.namaProduk;
    const daftarProdukId = req.cookies.daftar_produk;
    const produk = new Produk();
    await produk.deleteProduk(daftarProdukId, deletedProduk);
    res.redirect('/profil');
});

module.exports = deleteProduk;