//this folder is for port number i.e server and mongoDB connectDB function
import {app} from './app.js';
import { connectDB } from './data/database.js';

connectDB(); // this conncetDB function is called from data folder in which database.js is present

app.listen(process.env.PORT, ()=>{
    console.log(`Server is Running on Port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});