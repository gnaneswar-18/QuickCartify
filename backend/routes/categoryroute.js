import express from 'express'
import auth from '../middleware/auth.js'
import {addCategoryController,getCategoryController,updateCategoryController,deleteCategoryController} from '../controllers/categorycontroller.js'
const categoryRouter = express.Router()

categoryRouter.post('/add-category', auth, addCategoryController)
categoryRouter.get('/get',getCategoryController) 
categoryRouter.put('/update',auth,updateCategoryController)
categoryRouter.delete('/delete',auth,deleteCategoryController)
export default categoryRouter;