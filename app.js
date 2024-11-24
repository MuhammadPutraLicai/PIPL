const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const path = require('path');
const {getCustomerMainPage, getPemasokMainPage} = require('./src/controllers/main-page-controller');
const authentication = require('./routes/authentication');
const PemasokProfil = require('./src/controllers/pemasok-profil-controller');
const profil = require('./routes/profil-pemasok');
const bookmark = require('./routes/bookmark');
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    // Specify the upload directory
    cb(null, 'uploads/' + req.cookies.userId + '/');
    },
    filename: function (req, file, cb) {
    // Define the file name format
    cb(null, "company-logo.png");
    }
});

const upload = multer({ storage: storage });
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

app.use('/profil-pemasok', profil);//menampilkan profil pemasok note: untuk custmer dan pemasok

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

app.get('/profil', (req, res)=>{//menampilkan hal profil untuk pemasok, dengan opsi edit profil
    const pemasok = new PemasokProfil();
    pemasok.showPemasokProfilEdit(req.cookies.userId, req, res);
});

app.get('/profil-edit', (req, res)=>{//send form to update pemasok data
    res.render('edit-profil.pug');
});

app.post('/profil-update',upload.single('link_logo'), async (req, res)=>{//handle the receive updated data
    if(req.file){
        console.log("user just uploaded an logo image");
        req.body.link_logo = "uploads/" + req.cookies.userId + "/company-logo.png";
    }else{
        console.log("user do not upload any image");
    }
    const pemasok = new PemasokProfil();
    await pemasok.updatePemasokProfil(req, res);
    res.redirect('/profil');
    //console.log(req.file, req.body);
});

app.use('/bookmark', bookmark);
app.use('/authentication', authentication);

app.get('/logout', (req, res)=>{
    console.log(`user with id : ${req.session.userId} has logged out`);
    req.session.destroy();
    res.clearCookie('userId');
    res.clearCookie('connect.sid');
    res.clearCookie('bookmark');
    res.redirect('/authentication/login');
});

app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

app.listen(8080, ()=>{
    console.log("Server is listening at http://localhost:8080");
})