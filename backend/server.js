import express from 'express'
import dotenv from 'dotenv'
import path from "path";
//import products from './data/products.js'
import cookieParser from 'cookie-parser'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
dotenv.config()


connectDB();


const port = process.env.PORT || 8000

const app = express()

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended : true}))

// so we can access req.cookies
app.use(cookieParser())

app.get('/',(req,res) => {
    res.send('API IS RUNNING...')
})
 
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes) 
app.use('/api/upload', uploadRoutes)  

app.get('/api/config/paypal', (req,res) =>  res.send({ clientId: process.env.PAYPAL_CLIENT_ID}))

// set dirname to current directory
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`app is running on port ${port}`)
})
