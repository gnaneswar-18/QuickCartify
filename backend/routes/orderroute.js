import express from 'express';
import { cashOnDeliveryController, paymentDeliveryController,getOrderController } from '../controllers/ordercontroller.js';
import Auth from '../middleware/auth.js';
const orderRouter=express.Router()


orderRouter.post('/cash',Auth,cashOnDeliveryController)
orderRouter.post('/pay',Auth,paymentDeliveryController)
orderRouter.get('/getorders',Auth,getOrderController)


export default orderRouter;