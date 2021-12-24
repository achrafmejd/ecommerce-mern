// Import Packages
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');

// Express app
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json()); 
/* express.json() : Takes any JSON coming from a POST Req and parse is as a JS Object */
app.use(cookieParser());

// View Engine
app.set('view engine', 'ejs');
// Routes
app.get('/api', (req,res)=>{
    res.json({
        name : 'achraf'
    })
})

// DB Connection
dbURI = 'mongodb://localhost:27017/mern';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
      console.log('Connected Successfully');
      app.listen(3001);
  })
  .catch((err) => console.log(err));


app.get('*', checkUser);
app.get('/', (req, res) => res.render('home', {title : 'Home'}));
app.use('/products',productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', orderRoutes);
app.use(authRoutes);

// Cookies
/* app.get('/set-cookies', (req,res)=>{
    //res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('newUser', false, {maxAge : 1000*60*60*24, secure: true});
    res.send('You got the cookies');
});

app.get('/read-cookies', (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);

    res.json(cookies);
}); */