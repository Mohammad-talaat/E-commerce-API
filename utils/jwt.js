const jwt = require("jsonwebtoken")
const {StatusCodes} = require('http-status-codes')

const createJWT = ({payload}) =>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_LIFETIME})
    return token;
}

const verifyToken = ({token})=> jwt.verify(token,process.env.JWT_SECRET)

const attachCookiesToResponse = ({res,user})=>{
    const token = createJWT({payload:user})
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token ,{
        httpOnly:true,
        expires: new Date(Date.now() + (oneDay * 30) ),//30 * one day to get 30 days expires as we make the token expires in the same number of days
        secure:process.env.NODE_ENV === 'production',
        signed:true
    })   
    // res.status(StatusCodes.CREATED).json({user})

}
module.exports = {
    createJWT,
    verifyToken,
    attachCookiesToResponse
}