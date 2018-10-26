const express = require('express');
const router = express.Router();
const logger=require('../../Logs/logConfig.js')
const SellerModel=require('../models/SellerModels.js');
const UserOperations=require('../Database/UserOperations.js')

//nik god code code
const productOperations=require('../Database/productOperations');

/* GET api listing. */
router.post('/api', (req, res) => {
  logger.debug('api works');
  console.log('api works');
  console.log('req.header from api',req.headers);
  console.log(req.session.id);
  if(req.session.userid){
    console.log('user login')
    res.send({ isLogin :true})
  }
  else{
    console.log('user not login');
    res.send({isLogin : false});
  }
});

router.post('/doLogin',(req,res)=>{
  logger.debug('inside doLogin Routes');
  console.log('i m nside the doLogin route');
  console.log('req.session',req.session.id);
  console.log('req.body',req.body);
  console.log('req.headers',req.headers);
  userId=req.body.UserData.Email;
  password=req.body.UserData.Password;
  console.log('userID',userId);
  console.log('Password',password);
  const seller=new SellerModel(userId,password);
  UserOperations.fetchUser(seller,req,res);
});

router.post('/addProduct',(req,res)=>{
  logger.debug('trying to add product');
  console.log('i m adding the product');
  console.log('req.pdetails',req.body);
  let prDetails=req.body;
  UserOperations.AddProducts(prDetails,req,res);
});

router.get('/showProducts',(req,res)=>{
  logger.debug('trying to show products');
  console.log('Trying to show Products');
  console.log("reqbody",req.headers);
  UserOperations.GetProducts2(req,res);
});

router.delete('/deleteProducts/:pId?',(req,res)=>{
  logger.debug('trying to make the status of products deactivate');
  console.log('Trying to Update the Active Status');
  console.log('reqbody',req.headers);
  console.log(req.params);
  array= req.params.pId.split(',');
  console.log(array);
  UserOperations.DeleteProducts(array,res);

})
router.put('/updateProducts/:pId?',(req,res)=>{
  console.log('trying to update the products in api');
  console.log('reqbody',req.headers);
  pId=req.params.pId;
  productDetails=req.body;
  
  UserOperations.UpdateProduct(pId,productDetails,res);
  
})
router.get('/GetProductSeller/:sId',(req,res)=>{
  console.log('inding product according to the seller');
  sId=req.params.sId;
  console.log('sid',sId);
  UserOperations.GetProductSeller(res,sId);
})



module.exports = router;
