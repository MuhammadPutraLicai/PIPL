const express = require('express');
const Registration = require('./../src/controllers/registration-controller');
const Login = require('./../src/controllers/login-controller')
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

//routes to receive and process login data----
authentication.post('/login-pemasok', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const authPemasok = new Login();
    await authPemasok.authPemasok(email, password);
    if (authPemasok.userAuth == 1) {
        res.cookie("userId", authPemasok.userId);
        res.cookie("bookmark", authPemasok.userData.bookmark);
        res.cookie("daftar_produk", authPemasok.userData.daftar_produk);
        req.session.userId = authPemasok.userId;
        res.status(200).json({message:"ok", role:"pemasok"});
    }else{
        res.status(401).json({message:"You're putting the wrong email or password"});
    }
});

authentication.post('/login-customer', async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const authCustomer = new Login();
    await authCustomer.authCustomer(email, password);
    if (authCustomer.userAuth == 1) {
        res.cookie("userId", authCustomer.userId);
        res.cookie("bookmark", authCustomer.userData.bookmark);
        req.session.userId = authCustomer.userId;
        res.status(200).json({message:"ok", role:"customer"});
    }else{
        res.status(401).json({message:"You're putting the wrong email or password"});
    }
});



//routes for register
authentication.get('/register-pemasok', (req, res)=>{
    res.render('register-pemasok.pug',{formPath : '/authentication/register-pemasok'});
});

authentication.get('/register-customer', (req, res)=>{
    res.render('register-customer',{formPath : '/authentication/register-customer'});
});

//routes to receive register data
authentication.post('/register-pemasok', async (req, res)=>{
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
    await registerController.createNewPemasok(newPemasok);
    
    const authPemasok = new Login();
    await authPemasok.authPemasok(newPemasok.email, newPemasok.password);
    if (authPemasok.userAuth == 1) {
        res.cookie("userId", authPemasok.userId);
        res.cookie("bookmark", authPemasok.userData.bookmark);
        res.cookie("daftar_produk", authPemasok.userData.daftar_produk);
        req.session.userId = authPemasok.userId;
        res.render('register-success.pug', {path: "/main-pemasok"});
    }else{
        res.status(401).send("something went wrong");
    }
});

authentication.post('/register-customer', async (req, res)=>{
    const newCustomer = {
        nama : req.body['nama'],
        nomor_telepon : req.body['nomor-telepon'],
        email : req.body['email'],
        kata_sandi : req.body['kata-sandi']
    };
    const registerController = new Registration();
    await registerController.createNewCustomer(newCustomer);

    const authCustomer = new Login();
    await authCustomer.authCustomer(newCustomer.email, newCustomer.kata_sandi);
    if (authCustomer.userAuth == 1) {
        res.cookie("userId", authCustomer.userId);
        res.cookie("bookmark", authCustomer.userData.bookmark);
        req.session.userId = authCustomer.userId;
        res.render('register-success.pug', {path: "/main-customer"});
    }else{
        res.status(401).send("something went wrong");
    }
});



module.exports = authentication;