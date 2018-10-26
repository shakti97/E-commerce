const mongoose=require('../common/connection.js');
const schema=mongoose.Schema;
// console.log(schema);
var userSchema = new schema({
    userid : {
        type : String,
        maxlength : 100,
        required : true
    },
    password: {
        type : String,
        maxlength : 100,
        required : true
    }
});
var userModel = mongoose.model('SellerCollection',userSchema);

function validateSeller(seller){
    const schema={
        userid : Joi.string().max(100).required(),
        password : Joi.string().max(100).required()
    }
    return Joi.validate(seller,schema);
}
module.exports.userModel=userModel;
module.exports.validate=validateSeller