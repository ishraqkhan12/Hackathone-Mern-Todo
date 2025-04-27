import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import morgan from "morgan"
import authRoutes from "./routes/authRoutes.js"
import taskRoutes from './routes/taskRoutes.js'


import cors from "cors"
//rest object
const app = express()

//env config
dotenv.config()

//database config
connectDb()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routing
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/task', taskRoutes)


//rest api
app.get('/', (req, res)=>{
    res.send("<h1>welcome to ecommerce app ishraq khan</h1>")
})

//port
const PORT = process.env.PORT || 8080;

//run listen 
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on ${PORT}`);
    
})