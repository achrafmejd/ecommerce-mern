const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique : true,
        required: [true, 'Please enter the product name']
    },
    image : {
        type : String,
        required : [true, 'Please enter the product image']
    },
    description: {
        type: String,
        required: [true, 'Please entr the product description']
    },
    category:{
        type: String,
        required: [true, 'Please enter the product category']
    },
    price: {
        type: Number,
        required: [true, 'Please enter the product price']
    },
    quantity : {
        type : Number,
        require: [true, 'Please enter the product quantity']
    },
    date_added: {
        type: Date,
        default: Date.now
    },
});

productSchema.pre('save', function(next){
    //const productDate = new Date(this.date_added);
    /* this.date_added = productDate.getDate()+
                "/"+(productDate.getMonth()+1)+
                "/"+productDate.getFullYear();*/
    
    next();
})

productSchema.post('save', function(doc, next){
    next();
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;