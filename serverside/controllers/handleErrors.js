// Handle errors
const handleErrors = (err)=>{
    
    let errors = {email : '', password : ''}; 

    // incorrect email
    if (err.message === 'Incorrect Email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'Incorrect Password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate error code
    if(err.code === 11000){
        errors.email = 'This email is already registered';
        return errors;
    }

    // Validation errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message;
        })
    } 
    return errors;
}

module.exports = handleErrors;