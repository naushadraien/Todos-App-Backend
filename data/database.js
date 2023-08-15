import mongoose from "mongoose";

export const connectDB = ()=>{ mongoose.connect(process.env.MONGO_URI,{
    dbName: 'todosBackend'
}).then((c)=>console.log(`Database Connected Successfully on ${c.connection.host}`)).catch((e)=>console.log(e))};