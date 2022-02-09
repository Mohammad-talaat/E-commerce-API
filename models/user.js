const mongoose  = require('mongoose')
const valitator = require('validator')
const User = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        minlength: 3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        validate:{
            validator: validator.isEmail, 
            message:'please provide a valid email'
        }
        
    },
    password:{
        type:String,
        required:[true,'Please provide a email'],
        minlength: 6,
        
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    }
})

module.exports = mongoose.model( "User", User )