const jwt = require('jsonwebtoken');
// Create tokens jwt
const maxAge = 3*24*60*60; // 3 days in seconds 
const createToken = (id) => {
    return jwt.sign({id}, 'mern-ecom', {
        expiresIn : maxAge
    });
}


module.exports = createToken;