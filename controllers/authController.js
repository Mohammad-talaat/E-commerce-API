require('dotenv').config()
const User = require('../models/user')
const { StatusCodes, PROCESSING } = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const {createJWT} = require('../utils')
const { date } = require('joi')

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
    const token = createJWT({payload:tokenUser})
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token ,{
        httpOnly:true,
        expires: new Date(Date.now() + (oneDay * 30) )//30 * one day to get 30 days expires as we make the token expires in the same number of days
    })
    res.status(StatusCodes.CREATED).json({user:tokenUser})
}
const login =  async (req,res)=>{
    res.send('login user');
}
const logout =  async (req,res)=>{
    res.send('logout user');
}

module.exports ={
    register,
    login,
    logout
}