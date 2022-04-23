// Import Packages
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const homeRoutes = require('./routes/homeRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const stripe = require("stripe")('sk_test_51KTD5GBbdooSCxMFHIGXCJgOniHlL52IuB8hgmAXD1lnG7MAjawHQTQsffowDO43J0eSHaHyZkXdN5IKi8WdzYrc00mT2kWcjw')
const passport = require("passport");
// Express app
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json()); 
/* express.json() : Takes any JSON coming from a POST Req and parse is as a JS Object */
app.use(cookieParser());
app.use((_, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(passport.initialize());
require("./controllers/auth")(passport);

// DB Connection
dbURI = 'mongodb://localhost:27017/mern';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
      console.log('Connected Successfully');
      app.listen(3001);
  })
  .catch((err) => console.log(err));


app.get('*', checkUser);
app.get('/', homeRoutes);
app.use('/products',productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', orderRoutes);
app.use(authRoutes);
/* From here */
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/2fa", require("./routes/2fa"));
// THIS ROUTE IS NOT USED IN THE APP, JUST A SAMPLE JWT VERIFICATION
app.use("/api/token", require("./routes/tokenVerification"));
/* To here */

app.post('/stripe', async (req, res) => {
    //user sends price along with request
    console.log('STRIPE',req.body)
    const userPrice = parseInt(req.body.price)*100;
    try {
        const intent = await stripe.paymentIntents.create({ 
          //use the specified price
          amount: userPrice,
          currency: 'usd'
        });      
        //respond with the client secret and id of the new paymentintent
        res.json({client_secret: intent.client_secret, intent_id:intent.id});
    } catch (error) {
        console.log(error)
    }
    //create a payment intent
  })

//handle payment confirmations
app.post('/confirm-payment', async (req, res) => {
    console.log('CONFIRM PAYMENT',req.body)
    
    //extract payment type from the client request
    const paymentType = String(req.body.payment_type);
  
    //handle confirmed stripe transaction
    if (paymentType == "stripe") {
  
      //get payment id for stripe
      const clientid = String(req.body.payment_id);
  
      //get the transaction based on the provided id
      stripe.paymentIntents.retrieve(
        clientid,
        function(err, paymentIntent) {
  
          //handle errors
          if (err){
            console.log(err);
          }
          
          //respond to the client that the server confirmed the transaction
          if (paymentIntent.status === 'succeeded') {
  
            /*YOUR CODE HERE*/  
            
            console.log("confirmed stripe payment: " + clientid);
            res.json({success: true});
          } else {
            res.json({success: false});
          }
        }
      );
    } 
    
  })
