import express from 'express';
import { addAddressController, deleteAddressController, getAddressController } from '../controllers/addresscontroller.js';
import Auth from '../middleware/auth.js';
const addressRouter=express.Router()


addressRouter.post('/add',Auth,addAddressController)
addressRouter.get('/get',Auth,getAddressController)
addressRouter.delete('/delete',Auth,deleteAddressController)
export default addressRouter;