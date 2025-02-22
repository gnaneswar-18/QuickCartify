import express from 'express';
import { cashOnDeliveryController } from '../controllers/ordercontroller.js';
import Auth from '../middleware/auth.js';
const orderRouter=express.Router()


orderRouter.post('/cash',Auth,cashOnDeliveryController)

export default orderRouter;