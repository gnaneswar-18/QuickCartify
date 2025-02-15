import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderId: {
        type: String,
        required: [true, 'provide orderId'],
        unique: true
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },

    product_details: {
        name: String,
        image: Array
    },
    paymentId: {
        type: String,
        default: ''
    },
    payment_Status: {
        type: String,
        default: ''
    },
    delivary_address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address'
    },
    subTotalAmt: {
        type: Number,
        default: 0
    },
    totalAmt: {
        type: Number,
        default: 0
    },
    invoice_receipt: {
        type: String,
        default: ''
    }
},{
    timestamps: true,  
})
const orderModel = mongoose.model('Order', orderSchema)
export default orderModel;