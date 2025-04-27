import express from 'express'
import {checkAdminRole, verifyToken} from '../middlewares/authMiddleware.js'
import { createCategoryController, deleteCategoryController, getAllCategoryController, getSingleCategory, updateCategoryController } from '../controllers/categoryController.js'


//router object
const router = express.Router()

//routing

//create category
router.post('/create-category',  verifyToken, checkAdminRole, createCategoryController)

//update category
router.put('/update-category/:id', verifyToken, checkAdminRole, updateCategoryController )

//get all category
router.get('/get-all-category', verifyToken, checkAdminRole, getAllCategoryController)

//delete category
router.delete('/delete-category/:id', verifyToken, checkAdminRole, deleteCategoryController)

//get single category
router.get('/single-category/:id', verifyToken, checkAdminRole, getSingleCategory)



export default router