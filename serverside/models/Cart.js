const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    items: {
        type: Array,
        default: []
    },
    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;