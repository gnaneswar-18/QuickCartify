// morgan and helmet to be installed
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectToMongoose from './config/db.js'
import userRouter from './routes/userroute.js'
import categoryRouter from './routes/categoryroute.js'
import uploadRouter from './routes/uploadroute.js'
import productRouter from './routes/productroute.js'
import cartRouter from './routes/cartroute.js'
const app = express()

dotenv.config()
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL,
}))
app.use(express.json())
app.use(cookieParser())

const port=8080 || process.env.PORT

app.get('/',(req,res)=>{
    res.json({
        message:"server is running"
    })

})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.listen(port,()=>{
    connectToMongoose()
    console.log(`Server is running on port ${port}`)
})