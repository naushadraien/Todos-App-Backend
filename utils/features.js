//repeated functions are stored in this utils folder for register and login api
import jwt from 'jsonwebtoken'

export const setCookie = (user,res,message,statusCode = 200)=>{ //getting user,res,message, statusCode from controllers folder for login and register
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    // console.log(process.env.NODE_ENV);

    // console.log(process.env.NODE_ENV === 'Development');

    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none', //sameSite and secure are extra parameters added for cookie
        secure: process.env.NODE_ENV === 'Development' ? false : true, //here if NODE_ENV is development i.e server is in development mode the secure will be false otherwise it is true
    }).json({
        success: true,
        message,
    })



}