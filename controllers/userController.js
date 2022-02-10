const User = require("../models/user")
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async(req,res)=>{
    // console.log(req.user)
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users})
}
const getSingleUser = async(req,res)=>{
    const user = await User.findOne({_id:req.params.id}).select("-password")
    if(!user){
        throw new CustomError.NotFoundError(`no user found with id: ${req.params.id}`)
    }
    res.status(StatusCodes.OK).json({user})
}
const showCurrentUser = async(req,res)=>{
    res.send('show Current User')
}
const updateUser = async(req,res)=>{
    res.send('update User ')
}
const updateUserPassword = async(req,res)=>{
    res.send('update User Password')
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
}