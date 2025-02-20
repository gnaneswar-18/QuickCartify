
import express from 'express';
import { addToCartController, getCartItemsController, updateQuantityController,deleteCartItemController,clearCartController } from '../controllers/cartcontroller.js';
import Auth from '../middleware/auth.js'
const cartRouter=express.Router()
cartRouter.post('/create',Auth,addToCartController)
cartRouter.get('/get',Auth,getCartItemsController)
cartRouter.put('/update',Auth,updateQuantityController)
cartRouter.delete('/delete',Auth,deleteCartItemController)
cartRouter.delete('/clear',Auth,clearCartController);
export default cartRouter