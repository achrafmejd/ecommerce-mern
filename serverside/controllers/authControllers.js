// controller actions
const User = require('../models/User');
const handleErrors = require('./handleErrors');
const createToken = require('./createToken');
const maxAgeIn_ms = 3*24*60*60*1000;

module.exports.signup_get = (req, res) => {
    res.render('signup', {title : 'Sign Up'});
}
  
module.exports.login_get = (req, res) => {
    res.render('login', {title : 'Log In'});
    res.json({title : 'Log In'})
}
  
module.exports.signup_post = async (req, res) => {
    // Line below : Destructing 
    const { name, email , password } = req.body;
    try{
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAgeIn_ms});
        res.status(201).json({user : user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.json({errors});
    }
    //res.send('new signup');
}
  
module.exports.login_post = async (req, res) => {
    // Line below : Destructing
    const { email , password } = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge:  maxAgeIn_ms});
        res.status(200).json({ user : user._id });
    }
    catch(err){
        const errors = handleErrors(err);
        //res.status(400).json({errors});
        res.json({errors});
    }
    console.log(req.body);
} 

module.exports.logout_get = (req,res) => {
    res.cookie('jwt', '', {maxAge : 1});
    res.redirect('/');
}