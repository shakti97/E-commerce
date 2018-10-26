const mongoose=require('../common/connection.js');
const schema=mongoose.Schema;
const Joi=require('joi');

const brandSchema= schema({
    BrandId :schema.Types.ObjectId,
    brandName :{
        type : String,
        required : true,
        maxlength : 100
    },
    ProductId :[{
        type : String,
        required : true
    }],
    Active : {
        type : Boolean,
        default : true
    }
})
var brandModel = mongoose.model('brands',brandSchema);
function validateBrand(brand){
    console.log('brand ',brand);
    const schema={
        brandName :Joi.string().max(100).required(),
    };
    return Joi.validate(brand,schema);
}

module.exports.brandModel=brandModel;
module.exports.validateBrand=validateBrand;