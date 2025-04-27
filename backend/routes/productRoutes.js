import express, { Router } from 'express'
import { checkAdminRole, verifyToken } from '../middlewares/authMiddleware.js'
import { createProductController, deleteProductController, getPhoto, getProductController,  ProductFilterController,  singleProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

//create product 
router.post('/create-product', verifyToken, checkAdminRole,formidable(), createProductController)

//get products
router.get('/get-all-products', getProductController)

//get single products
router.get('/single-product/:slug', singleProductController)

//get photo
router.get('/photo/:pid', getPhoto)

//delete product
router.delete('/delete-product/:pid', deleteProductController )

//update product
router.put('/update-product/:pid',verifyToken, checkAdminRole, formidable(), updateProductController)

//filter product
router.post('/product-filter', ProductFilterController)


export default router