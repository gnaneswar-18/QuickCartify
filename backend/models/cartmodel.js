import mongoose from 'mongoose'
const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 1,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },

},{
    timestamps: true,
})
const cartModel=mongoose.model('Cart',cartSchema);
export default cartModel