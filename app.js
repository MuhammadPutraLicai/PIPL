const express = require('express');
const {getPemasokCardList} = require('./controllers/pemasok-controller')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/main', (req, res)=>{
    getPemasokCardList(req, res);
    //res.send("<h2>database successfully accessed</h2>")
    //res.render('hal-utama-pemasok', {daftarPemasok: arrayPemasok});

})

app.listen(8080, ()=>{
    console.log("Server is listening at http://localhost:8080");
})