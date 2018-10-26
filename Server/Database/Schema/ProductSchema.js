const mongoose=require('../common/connection.js');
const Joi=require('joi')
const schema=mongoose.Schema;
const ProductSchema=schema({
    ProductId : schema.Types.ObjectId,
    name :{
        type: String,
        required : true,
        maxlength : 100
    },
    quantity : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    image : {
        type : String,
        required : true,
        maxlength : 1024
    },
    description : {
        type : String,
        maxlength : 2048
    },
    Date : {
        type : Date,
        default : Date.now()
    },
    sellerId :{
        type : String,
        required : true
    }
});
var ProductModel=mongoose.model('Products',ProductSchema);

function validateProduct(product){
    console.log('product ',product);
    const schema={
        name : Joi.string().max(100).required(),
        quantity : Joi.number().min(1).required(),
        price : Joi.number().required(),
        image : Joi.string().max(1024).required(),
        description : Joi.string().max(2048),
        sellerId : Joi.string().max(1024)
    }
    return Joi.validate(product,schema);
}
module.exports.ProductModel=ProductModel;
module.exports.validateProduct=validateProduct;