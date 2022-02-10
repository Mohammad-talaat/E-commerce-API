const CustomError = require('../errors');
const {verifyToken} = require('../utils')
const authenicateUser = async (req,res,next)=>{
    const token = req.signedCookies.token
    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid')   
    }
    try{
        const {name,userID,role} = verifyToken({token})
        req.user = {name,userID,role}
    }catch (error){
        throw new CustomError.UnauthenticatedError('authenication invalid')
    }
    
    next()
}
module.exports = {
    authenicateUser
}