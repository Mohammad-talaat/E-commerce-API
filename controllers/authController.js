require('dotenv').config()
const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const {attachCookiesToResponse} = require('../utils')

const register =  async (req,res)=>{
    console.log(req.body)
    const {name,email,password} = req.body
    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists)
    {
        throw new CustomError.BadRequestError('Email already exists')
    }
    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? "admin" : "user";
    const user = await User.create({name, email, password,role})
    const tokenUser = {name:user.name,userID:user._id,role:user.role}
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}
const login =  async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password)
    {
        throw new CustomError.BadRequestError("please provide a valid email and password")
    }
    const user = await User.findOne({email})
    if(!user)
    {
        throw new CustomError.UnauthenticatedError("invalid credentails")
    }
    const checkPassword = await user.comparePassword(password)    
    if(!checkPassword)
    {
        throw new CustomError.UnauthenticatedError("invalid credentails")
    }
    const tokenUser = {name:user.name,userID:user._id,role:user.role}
    attachCookiesToResponse({res,user:tokenUser})
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}
const logout =  async (req,res)=>{
    res.send('logout user');
}

module.exports ={
    register,
    login,
    logout
}