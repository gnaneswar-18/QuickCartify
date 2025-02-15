import cartModel from '../models/cartmodel.js'
import userModel from '../models/usermodel.js'


const addToCartController = async (req, res) => {
    try {
        const userId = req.userId
        const {productId} = req.body
        if(!productId)return res.status(402).json({
            message: "Please provide product id",
            error: true,
            success: false,
        })
        const product = await ProductModel.findById(productId)
        if (!product) return res.status(404).json({
            message: "Product not found",
            error: true,
            success: false,
        })
        const cartitem=await new CartItem({
            product: productId,
            quantity: 1,
            userId: userId,
        })
        const savedcart=await cartitem.save()
        if(!savedcart) return res.status(404).json({
            message: "Failed to add item to cart",
            error: true,
            success: false,
        })
        const updateusercart=userModel.updateOne({_id:userId},{
            cart: [...user.cart, savedcart._id]
        })
        return res.json({
            message: "Item added to cart successfully",
            data: savedcart,
            error: false,
            success: true,
        })
        
    } catch (error) {
        return res.status(404).json({
            message: error.message || "Server error",
            error: true,
            success: false,
        })
        
    }
}



export {addToCartController}