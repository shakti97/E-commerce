const express= require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const api=require('./Routes/api.js');
const logger =require('../Logs/logConfig.js')
const cors=require('./middlewares/cors.js');
const session=require('express-session');


const app=express();
app.use(session({
    secret: 'Shakti Session',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false , maxAge:10*60*1000*365
}})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'dist')));
app.use(cors);
app.use('/',api);

app.listen(process.env.PORT || 1234,()=>{
    console.log('Server Started');
})