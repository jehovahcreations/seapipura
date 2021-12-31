const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const BankJobs = require('./Routes/bankjobs');
const CreditCard = require('./Routes/cc');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Bank = require('./model/bank')
const SubMenu = require('./model/subMenu')
var ejs = require('ejs');

//app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.engine('html',require('ejs').renderFile);
// Require static assets from public folder
//app.use(express.static(path.join(__dirname, 'public')));
 app.use(express.static("public"));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/',BankJobs)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect("mongodb://pura:123456@15.207.216.233/pura?authSource=pura")
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})
