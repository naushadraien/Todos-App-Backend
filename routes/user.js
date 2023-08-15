//this file is for route splitting using router as given below

import express from "express";
import { getAllUser, getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.get('/user/all', async (req,res)=>{ //here app.get is changed to router.get

router.get('/all', getAllUser);


// router.post('/user/new',async (req,res)=>{ //here app.post is changed to router.post
router.post('/new',register);

router.post('/login', login);

router.get('/logout', logout);


//creating dynamic Api for getting user data with user Id by adding :id to /userid so it becomes /userid/:id as below 
// router.get('/userid/:id', getUserbyId);

// //for updating user detail api
// router.put('/userid/:id', updateUser);

// //for deleting user detail api
// router.delete('/userid/:id', deleteUser);

//2nd method for same routes like /userid/:id

//if the routes are same like /me for get,put and delete as above then we can change all these three method to single line code as
router.get('/me',isAuthenticated,getMyProfile); //this is for loggedIn user


export default router;