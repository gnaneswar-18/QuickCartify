
import express from 'express';
import { addToCartController } from '../controllers/cartcontroller';
import Auth from '../middleware/auth.js'
const cartRouter=express.Router()
cartRouter.post('/create',Auth,addToCartController)

export default cartRouter