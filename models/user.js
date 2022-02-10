const mongoose  = require('mongoose')
const validator = require('validator')
const bcyrpt = require('bcryptjs')

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
        unique :true,
        validate:{
            validator: validator.isEmail, 
            message:'please provide a valid email'
        }
        
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength: 6,
        
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    }
})
User.pre('save', async function(){
    const salt = await bcyrpt.genSalt(10)
    this.password = await bcyrpt.hash(this.password, salt)
})

User.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcyrpt.compare(candidatePassword,this.password)
    return isMatch
}


module.exports = mongoose.model( "User", User )