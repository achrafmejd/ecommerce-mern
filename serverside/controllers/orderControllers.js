const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');
module.exports.order_post = (req,res)=>{
    /* 
        get id user
        get req body containing all info
        get product id and cart info using the db
        create the order doc
        send it to db
        save it
        decrementing the quantity of the product
        

    */

}

module.exports.order_get = async (req,res)=>{
    let userId = '';
    jwt.verify(req.cookies.jwt, 'mern-ecom', (err, decodedToken)=>{
        if(err){
            console.log(err.message);
        }else{
            userId = decodedToken.id;
        }})
    
    try{
        const mycart = await Cart.find({userId : userId});
        res.render('checkout', {title : 'CheckOut', mycart});
    }
    catch(error){
        console.log(error);
    }
}
