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
        res.status(200).json({product});
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
        title : 'Whey',
        image: '.',
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut est in nunc maximus commodo ac et nisi. Ut quis accumsan enim. Nunc volutpat tincidunt urna ut facilisis. Nulla rhoncus, mauris eu iaculis rhoncus, augue urna facilisis neque, sed dignissim nisi nisi sit amet est. Vestibulum vitae enim posuere, accumsan elit ac, accumsan lacus. Curabitur eu tempor lorem. Mauris ultricies tempor ornare. Donec quis placerat nunc. Pellentesque vitae quam nisl. Suspendisse eget tincidunt augue. Aliquam iaculis augue iaculis mauris semper, finibus iaculis leo tempus. Ut malesuada mollis malesuada.Morbi semper interdum tincidunt. Pellentesque dapibus bibendum mauris vitae volutpat. Donec id luctus eros, nec bibendum mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis velit nec posuere interdum. Sed ut tellus id felis viverra volutpat. Curabitur ante diam, dignissim vitae scelerisque id, iaculis vitae augue. Quisque dolor dui, lobortis in ultricies ac, malesuada et orci. Suspendisse viverra accumsan felis et lacinia. Ut commodo eros sed hendrerit placerat. Morbi pellentesque nec ipsum eget laoreet. Cras volutpat sapien eu ipsum dignissim, ut convallis lacus porttitor.',
        category : 'Health',
        price : 100,
        quantity : 150,
    }
    try{
        const products = await Product.create(data);
        res.status(200).json({products});
    }
    catch(error){
        console.log(error);
    }
}   

module.exports.add_product = (req,res)=>{
    res.send("Hello")
}

