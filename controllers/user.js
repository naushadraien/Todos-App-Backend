//this file is for functions to be used in routes folder within the router.get('/all',here function name as we are making below as)

import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

//this is for route /all in route folder
export const getAllUser = async (req,res,next)=>{ //here route is /user/all which was previously prefixed as /user to /all so that it can be /user/all from app.js file
    try { //try catch only used for async await
        const user = await User.find();
    res.status(200).json({
        success: true,
        user,
    })
    } catch (error) {
        next(error)
    };
};



//this is for route /me in route folder and this is for logged in user
export const getMyProfile = (req,res)=>{//here app.get is changed to router.get
        //these commented code is moved to the auth.js file in middlewares folder
    // const {token} = req.cookies;

    // if(!token){
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Please login first'
    //     })
    // }

    // // console.log(token);

    // const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    // const user = await User.findById(decodedUser._id); 
    // console.log(user);

    res.status(200).json({
        success: true,
        user: req.user,
    })

};

export const logout = (req,res)=>{
        res.status(200).cookie('token', '', {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none', //sameSite and secure are extra parameters added for cookie
            secure: process.env.NODE_ENV === 'Development' ? false : true, //here if NODE_ENV is development i.e server is in development mode the secure will be false otherwise it is true
        }).json({
            success: true,
            user: req.user,
            message: 'Successfully logged out'
        })
};


export const login = async (req,res,next)=>{
try {
    const {email ,password} = req.body;

    const user = await User.findOne({email}).select('+password');

    // if(!user){
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Invalid Email or Password!'
    //     })
    // };

    if(!user) return next(new ErrorHandler('Invalid Email or Password!', 404));

    const isMatchPass = await bcrypt.compare(password,user.password);

    // if(!isMatchPass){
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Invalid Email or Password!'
    //     })
    // };

    if(!isMatchPass) return next(new ErrorHandler('Invalid Email or Password!', 404));


    setCookie(user,res,`Welcome back, ${user.name}`,200);
} catch (error) {
    next(error);
}

};

export const register = async(req,res,next)=>{
try {
    const {name,email,password} = req.body;

    // console.log(process.env.JWT_SECRET);

    let user = await User.findOne({email});

    // console.log(user);


    // if(user){
    //     return res.status(404).json({
    //     success: false,
    //     message: 'User Already Exist'
    // })};

    if(user) return next(new ErrorHandler('User Already Exist', 404));


    const hashedPassword = await bcrypt.hash(password,10)

    user = await User.create({name, email, password: hashedPassword});

    //here using repeated function for cookie setting from utils folder within features.js
    setCookie(user,res,"Registered Successfully", 201); //passing user,res, message and statusCode from here to utils folder i.e in features.js with function setCookie()

} catch (error) {
    next(error)
}
    };

