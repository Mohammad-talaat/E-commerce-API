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

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new CustomError.UnauthorizedError(
          'Unauthorized to access this route'
        );
      }
      next();
    };
  };
  
module.exports = {
    authenicateUser,authorizePermissions
}