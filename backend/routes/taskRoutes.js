import express, { Router } from 'express'
import {  verifyToken } from '../middlewares/authMiddleware.js'
import { createTaskController, deleteTaskController, getTasksController, SingleTaskController, updateTaskController } from '../controllers/TastController.js'

const router = express.Router()

//task add
router.post('/create-task', verifyToken, createTaskController)

//task get
router.get('/get-all-tasks', verifyToken, getTasksController);

//update task
router.put('/update-task/:taskId', verifyToken, updateTaskController);

//get single product
router.get('/single-task/:taskId', verifyToken, SingleTaskController);

// delete product
router.delete('/delete-task/:taskId', verifyToken, deleteTaskController)


export default router