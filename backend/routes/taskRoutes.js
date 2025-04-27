import express, { Router } from 'express'
import { checkAdminRole, verifyToken } from '../middlewares/authMiddleware.js'
import { createTaskController, getTasksController, SingleTaskController, updateTaskController } from '../controllers/TastController.js'

const router = express.Router()

//task add
router.post('/create-task', verifyToken, createTaskController)

//task get
router.get('/get-all-tasks', verifyToken, getTasksController);

//update task
router.put('/update-task/:taskId', verifyToken, updateTaskController);

//get single product
router.get('/single-task/:taskId', verifyToken, SingleTaskController);


export default router