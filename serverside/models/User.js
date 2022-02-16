const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : { 
        required : [true, 'Please enter your name'],
        type : String,
    },
    email : {
        type : String,
        required : [true, 'Please enter your Email'],
        unique : true,
        lowercase : true,
        validate : [isEmail, 'Please enter a valid Email']
    },
    password : {
        type : String,
        required : [true, 'Please enter a password'],
        minlength : [6, 'Minimum password length is 6 characters']

    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    isSubscribedToNewsletter : {
        type: Boolean,
        default: false
    }
});

// Mongoose middleware : fire a function before saving the doc 
userSchema.pre('save', async function(next){
    // Hashing password before saving it into the db
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); 

    next();
})

// Mongoose middleware : fire a function after the doc is saved to the db
userSchema.post('save', function(doc,next){
    
    next();
})

// Static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}

const User = mongoose.model('User', userSchema);
module.exports = User;