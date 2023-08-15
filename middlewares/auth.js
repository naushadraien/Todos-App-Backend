import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'


export const isAuthenticated = async (req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return res.status(404).json({
            success: false,
            message: 'Please login first'
        })
    }

    // console.log(token);

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedUser._id); //decoded data is saved to req.user
    next(); //executing next fuction i.e getMyProfile in routes when isAuthenticated function is called
}