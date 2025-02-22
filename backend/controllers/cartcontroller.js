import cartModel from '../models/cartmodel.js';
import userModel from '../models/usermodel.js';
import ProductModel from '../models/productmodel.js'; 

const addToCartController = async (req, res) => {
    try {
        const userId = req.userId;
        if(!userId) return res.json({
            message: "login is required",
            error: true,
            success: false,
        })
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Please provide product ID",
                error: true,
                success: false,
            });
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        const existingCartItem = await cartModel.findOne({ productId: productId, userId:userId });
        if (existingCartItem) {
            return res.status(400).json({
                message: "Item already exists in the cart",
                error: true,
                success: false,
            });
        }

        const cartItem = new cartModel({
            productId: productId,
            quantity: 1,
            userId: userId,
        });

        const savedCart = await cartItem.save();
        if (!savedCart) {
            return res.status(500).json({
                message: "Failed to add item to cart",
                error: true,
                success: false,
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        await userModel.updateOne(
            { _id: userId },
            { $push: {shopping_cart : savedCart._id } } 
        );

        return res.status(201).json({
            message: "Item added to cart successfully",
            data: savedCart,
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

const getCartItemsController=async(req,res)=>{
    try {
        const userId = req.userId;
        const cartitem=await cartModel.find({userId: userId}).populate('productId');

        return res.json({
            message: "Cart items fetched successfully",
            data: cartitem,
            error: false,
            success: true,
        })
        
    } catch (error) {
        return  res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
} 

const updateQuantityController =async(req, res, ) => {
try {
    const userId=req.userId
    const {id,qty}=req.body
    if(!id || !qty){
        return res.status(400).json({
            message: "Provide id and quantity",
            error: true,
            success: false,
        })

    }
    
    const updatedcart=await cartModel.updateOne({
        _id:id,
        userId:userId   

    },{ quantity:qty})
    return res.json({
        message: "Item updated in cart successfully",
        data: updatedcart,
        error: false,
        success: true,
    })
    
} catch (error) {
    return res.status(500).json({
        message: error.message || "Server error",
        error: true,
        success: false,
    })
}}

const deleteCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Provide cart item ID",
                error: true,
                success: false,
            });
        }

      
        const deletedCart = await cartModel.deleteOne({ _id: id, userId });

        if (deletedCart.deletedCount === 0) {
            return res.status(404).json({
                message: "Item not found in cart",
                error: true,
                success: false,
            });
        }

      
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { shopping_cart: id } }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: "Item deleted from cart successfully",
            error: false,
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};

const clearCartController = async (req, res) => {
    console.log("ClearCartController triggered");
    
    try {
        const userId = req.userId;
        const deletedCart = await cartModel.deleteMany({ userId });
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: userId },
            { $set: { shopping_cart: [] } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        return res.json({
            message: deletedCart.deletedCount > 0 
                ? "Cart cleared successfully" 
                : "Cart was already empty",
            error: false,
            success: true,
        });

    } catch (error) {
        console.error("Error clearing cart:", error);
        return res.status(500).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        });
    }
};


export { addToCartController,
    getCartItemsController,
    updateQuantityController,
    deleteCartItemController,
    clearCartController
};
