import express from "express"
import {registerController, loginController, adminController} from "../controllers/authControllers.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

//router object
const router = express.Router()

//routing
// register || post
router.post('/register', registerController)

// login || post
router.post('/login', loginController) 

//admin || get 
router.get('/admin', verifyToken,  adminController )

// protected route
router.get('/user-auth', verifyToken,  (req, res)=>{
    res.status(200).send({ ok:true})
})

//protected route HOME
router.get('/home-page', verifyToken, (req, res)=>{
    res.status(200).send({ ok:true})
})

//update user || put
// router.get()

export default router