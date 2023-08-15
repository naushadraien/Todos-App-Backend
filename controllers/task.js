import ErrorHandler from '../middlewares/error.js';
import {Task} from '../models/task.js';

export const createTask = async (req,res,next)=>{
    try {
        const {title,description} = req.body;

   const task =  await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(201).json({
        success: true,
        message: 'Task Created Successfully',
    })
    } catch (error) {
        next(error)
    };

};

export const getMyTask = async (req,res,next)=>{
   try {
    const userId = await req.user._id

   const tasks = await Task.find({user: userId});

    res.status(200).json({
        success: true,
        message: 'Task find successfully',
        tasks,
    })
   } catch (error) {
    next(error);
   };

};

export const updateMyTask = async (req,res,next)=>{
   try {
    const {id} = req.params; //finding task id from request parameter

    const task = await Task.findById(id);

    // if(!task){
    //     return res.status(404).json({
    //         success: false,
    //         message: 'Task Not Found!'
    //     })
    // }

    //using error middleware with next()  for reducing the above code for error handling
    // if(!task) return next(new Error()) //here no Error message is given in the Error() so it will print Internal Server Error message from error.js file middleware function

    //here the above next(new Error()) is replaced by the below ErrorhHandler() for giving custom message and statusCode
    if(!task) return next(new ErrorHandler('Task not found!',404)); //this Errorhandler class is made for giving differnt message and statusCode for different controllers her updateMyTask controller

    task.isCompleted = !task.isCompleted; //if task is completed true then task is completed will be false

    await task.save();

     res.status(200).json({
         success: true,
         message: 'Task updated Successfully'
     })
   } catch (error) {
    next(error)
   };
 
 };

 export const deleteMyTask = async (req,res,next)=>{
    try {
        const {id} = req.params;
    const task = await Task.findById(id);

    if(!task) return next(new ErrorHandler('Task not found!', 404)); //this Errorhandler class is made for giving differnt message and statusCode for different controllers her deleteMyTask controller
    
    await task.deleteOne();

     res.status(200).json({
         success: true,
         message: 'Task deleted Successfully'
     })
    } catch (error) {
        next(error)
    };
 
 };