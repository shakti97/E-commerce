// const mongoose=require('./common/connection');
const UserRoleMapping= require('../../../eshopp/backend/db/schema/userRoleMapping');
const Users=require('../../../eshopp/backend/db/schema/userSchema');
const Product=require('../../../eshopp/backend/db/schema/productSchema');
const Admin=require('../../../eshopp/backend/db/schema/adminSchema');
const Roles=require('../../../eshopp/backend/db/schema/roleSchema');
const Rights=require('../../../eshopp/backend/db/schema/rightSchema');
const roleRightMapping=require('../../../eshopp/backend/db/schema/roleRightMapping');

var productOperations={

    deleteSeller(request,response){

        console.log('inside the deleteSeller api...');
        let sellerid=request.body.sellerid;
        Users.deleteOne({"username": sellerid}, (err)=>{

            if(err){
                console.log('error deleting the seller...');
                response.json({
                    error: err,
                    responseText: 'error deleting the seller...',
                    isSellerDeleted: false
                });
            }
            else{

                UserRoleMapping.deleteOne({"username": sellerid},(err)=>{
                    
                    if(err){
                        console.log('error deleting the seller...');
                        response.json({
                            error: err,
                            responseText: 'error deleting the seller...',
                            isSellerDeleted: false
                        });
                    }
                    else{

                        console.log('deletion of seller done sucessfully....');
                        response.json({
                            isSellerDeleted: true
                        })
                    }

                });
            }
        })
    },

    getSellers(request,response){

        console.log('inside the geetSellers function...');
        Users.find({"role":"seller"},(err,content)=>{
            if(err){

                console.log('error finding sellers...');
                response.json({
                    error: err,
                    responseText:'error finding sellers...'
                });
            }

            else if(content && content.length>0){

                console.log('content obtained in finding sellers is',content);
                response.json({
                    content: content,
                    status: 200
                });
            }
        });
    },

    addAdmin(adminObject,request,response){

        console.log('adminObject obtained at backend is',adminObject);

var admin=new Admin({

    'username': adminObject.username,
    'password': adminObject.password,
    'role': adminObject.role
});

admin.save(err=>{

    if(err){

        response.json('could not add the admin');
    }

    else{

        response.json('added successfully...');
    }
});

    },

    checkAdmin(adminObject,request,response){

        console.log('inside the checkkadmin function...');
        console.log('the adminObject inside the checkAdmin function is',adminObject);
       Users.find({"username":adminObject.username,"password": adminObject.password}, (err,content)=>{

        console.log("error inside the callback is "+ err + "content is :- ",content);
            if(err){

                console.log('inside the error part...');

                response.json({

                    status: 404,
                    error: err
                });
            }

            else if(content && content.length>0){

                UserRoleMapping.find({ "username": content[0].username},(err,userRoleContent)=>{
                    console.log("userRoleContent "+userRoleContent);
                    if(err){

                        console.log('error inside of the Userrolemapping');
                        response.json({

                            error: err,
                            responseText: 'could not load the required values from the userrolemapping table'
                        });
                    }

                    else if(userRoleContent && userRoleContent.length>0){
                        console.log('content inside the userrolemapping table', userRoleContent);

                        Roles.find({"roleid": userRoleContent[0].roleid},(err,roleContent)=>{

                            console.log('rolecontent', roleContent);
                            Users.update({"username": content[0].username, "password": content[0].password},
                            {"role": roleContent[0].rolename},(err,numAffected)=>{
                                if(err){

                                    console.log('error updating the document....');
                                    response.json({
                                        error: err,
                                        responseText: 'error updating the document....'
                                    })
                                }

                                else{

                                    console.log('successfully updated the values and no of values updated are :-',numAffected);

                                    Rights.find({"rightid":content[0].rights[0]},(err,RightContent)=>{

                                        if(err){
                                            console.log('error in getting role right content...');
                                            response.json({
                                                error: err,
                                                responseText: 'error in getting role right content'
                                            })
                                        }

                                        else if(RightContent && RightContent.length>0){
                                            console.log('rightcontent:-',RightContent);
            request.session.username=content[0].username;
            request.session.save(err=>{

                if(err){
                    console.log('error saving the session...');
                    response.json({
                        error: err,
                        responseText: 'error saving the session'
                    });
                }

                else {

                    console.log('session saved successfully..');
                }
            });

                console.log('session created');
                console.log('request.session ', request.session);
                response.json({

                    data: content[0],
                    status: 200,
                    sessionID: request.sessionID,
                    rights: RightContent,
                    Roles: roleContent
                });

                                        }
                                    })

                                }
                            });
                        });
                    }

                    else{

                        console.log('inside userrolemapping else...');
                        response.json({
                            responseText: 'problem in userROleMapping',
                            status: 500
                        });
                    }
                });
            // request.session.username=content[0].username;
            // request.session.save(err=>{

            //     if(err){
            //         console.log('error saving the session...');
            //         response.json({
            //             error: err,
            //             responseText: 'error saving the session'
            //         });
            //     }

            //     else {

            //         console.log('session saved successfully..');
            //     }
            // });

            //     console.log('session created');
            //     console.log('request.session ', request.session);
            //     response.json({

            //         username: content[0].username,
            //         status: 200,
            //         role: content[0].role,
            //         sessionID: request.sessionID
            //     });
            }

            else{

                console.log('inside else ...');
                response.json({
                    status: 500
                });
            }
        });

    
        
    },

    getProducts(request,response){

        Product.find({},(err,content)=>{

            if(err){

                response.json({
                    errObtained: err,
                    status: "error"
                });

            }

                else if(content && content.length>0){

                    response.json({

                        data: content,
                        status: 200
                    
                    });
                }

                else{

                    response.json({

                       status: 403
                    });
                }
            
        });
    },

addProduct(productObject,request,response){

console.log('product object received at backend',productObject);
var product= new Product({

    productid:productObject.productid,
    productname: productObject.productname,
    producttype: productObject.producttype,
    productbrand: productObject.productbrand,
    productprice: productObject.productprice,
    productquantity: productObject.productquantity

});

console.log('product to be sennt to db',product);
product.save(err=>{

    if(err){
        response.json({
            status: 404,
            added: false,
            errorObtained: err
        });
    }

    else{

        response.json({

            status: 200
        });
    }
});
    
},

checkSession(sessionId,request,response){
    

    console.log("sessionId obtained at backend...",sessionId);
    console.log('the request.session is', request.session);
  
if(request.session && request.session.username){

    
    response.send(true);

}

else{

    response.send(false);
}

}
,


};

module.exports=productOperations;