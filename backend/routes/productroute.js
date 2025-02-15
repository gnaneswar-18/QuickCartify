import express from 'express'
import auth from '../middleware/auth.js'
import Adminauth from '../middleware/adminauth.js'
import { addProductController,getProductController,getProductDetailsController,getProductsByCategoryController, updateProductController,deleteProductController,searchProductController } from '../controllers/productcontroller.js'
const productRouter=express.Router()


productRouter.post('/create',auth,addProductController);
productRouter.get('/get',auth,getProductController);
productRouter.post('/get-product-by-category',getProductsByCategoryController);
productRouter.post('/get-product-details',getProductDetailsController)
productRouter.put('/update',auth,Adminauth,updateProductController);
productRouter.delete('/delete',auth,Adminauth,deleteProductController);
productRouter.post('/search',auth,searchProductController);

export default productRouter