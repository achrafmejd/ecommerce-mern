const Product = require('../models/Product');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

module.exports.products_get = async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({products}); //render('products', {title : 'Products', products});
    }
    catch(error){
        console.log(error);
    }
    //res.render('products', {title : 'Products'});
}

module.exports.product_get_by_id = async (req,res)=>{
    const id = req.params.id;
    try{
        const product = await Product.findOne({_id : id});
        res.status(200).render('product', {title : product.title, product});
    }catch(error){
        console.log(error);
    }
}

// removed from here and put in the cartControllers
module.exports.product_post_by_id = async (req,res)=>{
    /* const {productId, quantity} = req.body;
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
    } */
}

module.exports.products_post = async (req, res)=>{
    const data = {
        title : 'Knife',
        image : 'data:image/png;base64,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',
        description : 'Use it with the knife',
        category : 'Kitchen',
        price : 21,
        quantity : 5,
    }
    try{
        const products = await Product.create(data);
        res.status(200).json({products});
    }
    catch(error){
        console.log(error);
    }
}   

