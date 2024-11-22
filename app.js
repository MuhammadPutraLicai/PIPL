const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const {getCustomerMainPage, getPemasokMainPage} = require('./src/controllers/main-page-controller');
const authentication = require('./routes/authentication');
const profil = require('./routes/profil-pemasok');
const bookmark = require('./routes/bookmark');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    }
));
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'pug');
app.set('views', './src/views');

app.get('/', (req, res)=>{//redirect to login 
    res.redirect('/authentication/login')
});

app.use('/profil-pemasok', profil);

app.get('/main-pemasok', (req, res)=>{//to pemasok main page
    if (req.session.userId && (req.session.role == "pemasok")) {
        console.log(`user with id : ${req.session.userId} access /main-pemasok`);
        console.log("user cookie =>",req.cookies);
        getPemasokMainPage(req, res);
    }else{
        res.send("please login as pemasok");
    }
});

app.get('/main-customer', (req, res)=>{//to customer main page
    if (req.session.userId && (req.session.role == "customer")) {
        console.log(`user with id : ${req.session.userId} access /main-customer`);
        console.log("user cookie =>", req.cookies);
        getCustomerMainPage(req, res);
    }else{
        res.send("please login as customer");
    }
})

app.use('/bookmark', bookmark);

app.get('/logout', (req, res)=>{
    console.log(`user with id : ${req.session.userId} has logged out`);
    req.session.destroy();
    res.clearCookie('userId');
    res.clearCookie('connect.sid');
    res.clearCookie('bookmark');
    res.redirect('/authentication/login');
});

app.use('/authentication', authentication);

app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

app.listen(8080, ()=>{
    console.log("Server is listening at http://localhost:8080");
})