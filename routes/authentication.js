const express = require('express');
const Registration = require('./../src/controllers/registration-controller');
const authentication = express.Router();
authentication.use('/public', express.static( __dirname + '/../public'));

authentication.get('/login', (req, res)=>{
    res.render('login-path');
});

//routes for login---
authentication.get('/login-pemasok', (req, res)=>{
    //console.log(req.route.path);
    res.render('login.pug',{
        role : 'pemasok',
        formPath : '/authentication/login-pemasok',
        registerPath : '/authentication/register-pemasok'});
});

authentication.get('/login-customer', (req, res)=>{
    res.render('login.pug',{
        role : 'customer',
        formPath : '/authentication/login-customer',
        registerPath : '/authentication/register-customer'});
});

//routes to receive login data----
authentication.post('/login-pemasok', (req, res)=>{

});

authentication.post('/login-customer', (req, res)=>{
    res.send("data received");
    console.log(req.body.email);
});



//routes for register
authentication.get('/register-pemasok', (req, res)=>{
    res.render('register-pemasok.pug',{formPath : '/authentication/register-pemasok'});
});

authentication.get('/register-customer', (req, res)=>{
    res.render('register-customer',{formPath : '/authentication/register-customer'});
});

//routes to receive register data
authentication.post('/register-pemasok', (req, res)=>{
    const newPemasok = {
        nama_perusahaan : req.body['nama-perusahaan'],
        jenis_perusahaan : req.body['jenis-perusahaan'],
        jenis_produk : req.body['jenis-produk'],
        nomor_telepon : req.body['nomor-telepon'],
        email : req.body['email'],
        alamat : req.body['alamat'],
        password : req.body['kata-sandi'],
        deskripsi : req.body['deskripsi']
    };

    const registerController = new Registration();
    registerController.createNewPemasok(newPemasok);
    res.send("you data has been received, thank you");
});

authentication.post('/register-customer', (req, res)=>{
    const newCustomer = {
        nama : req.body['nama'],
        nomor_telepon : req.body['nomor-telepon'],
        email : req.body['email'],
        kata_sandi : req.body['kata-sandi']
    };
    const registerController = new Registration();
    registerController.createNewCustomer(newCustomer);
    res.send("file has been received");
});



module.exports = authentication;