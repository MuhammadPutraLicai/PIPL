const express = require('express');
const {getCustomerMainPage} = require('./src/controllers/main-page-controller');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/public', express.static( __dirname + '/public'));
app.set('view engine', 'pug');
app.set('views','./src/views');

app.get('/main', (req, res)=>{
    getCustomerMainPage(req, res);
})

app.listen(8080, ()=>{
    console.log("Server is listening at http://localhost:8080");
})