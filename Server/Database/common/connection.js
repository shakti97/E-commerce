const mongoose=require('mongoose');
const dbconfig=require('./config.js');
mongoose.connect(dbconfig.dbUrl);
module.exports=mongoose;