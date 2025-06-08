import express from 'express';
import { cashOnDeliveryController, paymentDeliveryController } from '../controllers/ordercontroller.js';
import Auth from '../middleware/auth.js';
const orderRouter=express.Router()


orderRouter.post('/cash',Auth,cashOnDeliveryController)
orderRouter.post('/pay',Auth,paymentDeliveryController)


export default orderRouter;