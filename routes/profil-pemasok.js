const express = require('express');
const PemasokProfil = require('./../src/controllers/pemasok-profil-controller');
const profil = express.Router();

profil.use('/public', express.static( __dirname + '/../public'));
profil.use('/uploads', express.static(__dirname + '/../uploads'));

profil.get('/:id', async(req, res)=>{
    if (req.session.userId){
        const profil = new PemasokProfil();
        profil.showPemasokProfil(req.params.id, req, res);
    }else{
        res.send("Please Login");
    }
});

profil.get('*', (req, res)=>{
    res.send("Sorry, this is the wrong url");
});

module.exports = profil;