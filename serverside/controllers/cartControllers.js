const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

module.exports.cart_get = async (req,res)=>{
    let userId = '';
    jwt.verify(req.cookies.jwt, 'mern-ecom', (err, decodedToken)=>{
        if(err){
            console.log(err.message);
        }else{
            userId = decodedToken.id;
        }})
    
    try{
        const mycart = await Cart.find({userId : userId});
        res.render('myCart', {title : 'MyCart', mycart});
    }
    catch(error){
        console.log(error);
    }
}

module.exports.cart_post = async (req,res)=>{
    // Managing the req
    const {productId, quantity} = req.body;
    let userId = '';
    // getting userId by thus method since the req.params.id does not refer to the user's one
    jwt.verify(req.cookies.jwt, 'mern-ecom', (err, decodedToken)=>{
        if(err){
            console.log(err.message);
        }else{
            userId = decodedToken.id;
        }})
    // Checking the db
    try{
        let cart = await Cart.findOne({userId});
        let product = await Product.findOne({_id: productId});
        //console.log(cart,product);
        // Product not found
         if(!product){
            //return res.status(404).send('Product not found');
            console.log('Product not found');
        }
        // Cart not found
        if(!cart){
            console.log('Cart not found');
            // Create a new cart for the user
            const cart = await Cart.create({
                userId : userId,
                items : [{
                    productId : productId,
                    name : product.title,
                    quantity : quantity,
                    price : product.price
                }],
                bill : product.price * quantity
            })
            return res.status(200);

        } else{
            // cart exists for the user
            let productIndex = cart.items.findIndex(p => p.productId == productId);

            // Check if the product exists or not
            if(productIndex == -1){
                // Add the item to the cart that exists
                //const cart = await Cart.findOne({userId : userId});
                cart.items.push({
                    productId : productId,
                    name : product.title,
                    quantity : quantity,
                    price : product.price     
                });
                cart.bill = cart.bill + product.price + quantity;
                cart = await cart.save();
                //return res.status(404).send('Product not found in  Cart');
            }else{
                let productItem = cart.items[productIndex];
                productItem.quantity = quantity;
                cart.items[productIndex] = productItem;
            }
            cart.bill = cart.items.reduce((sum, product)=> sum+product.price*product.quantity, 0);
            cart = await cart.save();
            return res.status(201).send(cart);
        } 
    } 
    catch(error){
        console.log("Error in update cart", error);
        res.status(500).send("Something went wrong");
    }
}