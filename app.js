//in this file only middleware should be used i.e app.use()
import express from 'express'
import userRouter from './routes/user.js'; //this is imported from routes folder for proper working of routes
import taskRouter from './routes/task.js'; //this is imported from routes folder for proper working of routes
import cors from 'cors'


//importing config from dotenv so that we can use .env urls from config.env which is in data folder
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';

    config({
        path: './data/config.env'
    });


export const app = express();


//using cors middleware CROSS ORIGIN RESOURCE SHARING
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))

//using middleware to store json file in database using Post method as given below in api/v1/user new route then we can easily access the data using postman or thunderclient from request body
app.use(express.json());
//using cookieParser middleware
app.use(cookieParser());

//using router as a middleware as
app.use('/api/v1/user',userRouter); //we can add prefix api/v1/user to the routes of in user.js of routes folder
app.use('/api/v1/task',taskRouter); //we can add prefix api/v1/task to the routes of in task.js of routes folder



//using error middleware
app.use(errorMiddleware) //this errorMiddleware function is imported from error.js file of middleware folder




