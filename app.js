require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
// database
const connectDB = require('./db/connect') 
const morgan = require('morgan')
const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(morgan('tiny'))
app.use(express.json())
const port = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("hello this is the server") 
})
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