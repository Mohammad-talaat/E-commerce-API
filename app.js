require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
// database
const connectDB = require('./db/connect') 
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoutes')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

const port = process.env.PORT || 5000
app.get('/',(req,res)=>{
    res.send("hello this is the server") 
})
app.get('/api/v1',(req,res)=>{
    // console.log(req.cookies) //THIS IS FOR THE NOT SIGNED COOKIES
    console.log(req.signedCookies)
    res.send("cookie page") 
})
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware)
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}

start()