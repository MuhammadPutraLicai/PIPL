const express = require('express');
const {getCustomerMainPage, getPemasokMainPage} = require('./src/controllers/main-page-controller');
const app = express();
const authentication = require('./routes/authentication');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/public', express.static( __dirname + '/public'));
app.set('view engine', 'pug');
app.set('views','./src/views');

app.get('/', (req, res)=>{
    res.redirect('/authentication/login')
});

app.get('/main-pemasok', (req, res)=>{
    getPemasokMainPage(req, res);
});

app.get('/main-customer', (req, res)=>{
    getCustomerMainPage(req, res);
})

app.use('/authentication', authentication);

app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

app.listen(8080, ()=>{
    console.log("Server is listening at http://localhost:8080");
})