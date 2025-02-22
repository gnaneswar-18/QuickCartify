import mongoose from 'mongoose';
import orderModel from '../models/ordermodel.js';
import UserModel from '../models/usermodel.js';
import cartModel from '../models/cartmodel.js';

const cashOnDeliveryController = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required", error: true, success: false });
        }

        const { list, subtotalamt, totalamt, addressid } = req.body;
        if (!list || !subtotalamt || !totalamt || !addressid) {
            return res.status(400).json({ message: "All fields are required", error: true, success: false });
        }

        const payload = list.map(el => ({
            userId,
            orderId: `obj-${new mongoose.Types.ObjectId()}`,
            productId: el.productId._id,
            product_details: {
                name: el.productId.name,
                image: el.productId.image,
            },
            paymentId: "",
            payment_status: "cashOnDelivery",
            delivery_address: addressid,
            totalAmt: totalamt,
            subTotalAmt: subtotalamt,
        }));

        const newOrders = await orderModel.insertMany(payload);
        await cartModel.deleteMany({ userId });
        await UserModel.findByIdAndUpdate(userId, {
            $set: { shopping_cart: [] },
            $push: { orderHistory: { $each: newOrders.map(order => order._id) } }
        });

        return res.status(201).json({
            message: "Order placed successfully",
            success: true,
            orders: newOrders
        });

    } catch (error) {
        console.error("Error in cashOnDeliveryController:", error);
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

export { cashOnDeliveryController };
