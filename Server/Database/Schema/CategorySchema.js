const mongoose=require('../common/connection.js');
const Joi=require('joi')
const schema=mongoose.Schema;

const CategorySchema=schema({
    CategoryId : schema.Types.ObjectId,
    CategoryName : {
        type : String,
        required : true,
        maxlength : 100
    },
    ProductId :[{
        type : String,
        required : true
    }],
    BrandId : [{
        type : String,
        required : true
    }],
    Active : {
        type : Boolean,
        default : true
    }
})

var CategoryModel= mongoose.model('Categories',CategorySchema);
function validateCategory(category){
    console.log('category ',category);
    const schema={
        CategoryName: Joi.string().max(100).required()
    };
    return  Joi.validate(category,schema);
}
module.exports.categoryModel=CategoryModel;
module.exports.validateCategory=validateCategory;