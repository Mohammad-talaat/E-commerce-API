const express = require('express')
const { startSession } = require('mongoose')
const app = express()

app.use(express.json())
const port = process.env.PORT || 5000

const start = async () => {
    try{
        app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}

start()