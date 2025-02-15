import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: {
        type: Array,
        default: []
    },
    category: [{
        type: mongoose.Schema.ObjectId,
        ref: "category"
    }],
    unit: { type: String, default: "" },
    stock: { type: Number, default: null },
    price: { type: Number, default: null },
    discount: { type: Number, default: null },
    description: { type: String, default: "" },
    publish: { type: Boolean, default: true },



}, {
    timestamps: true,
});
const ProductModel = mongoose.model('Product', productSchema)
export default ProductModel