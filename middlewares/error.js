class ErrorHandler extends Error{ //This Error class is the same which is used in the next() function as next(new Error()) in controllers folder
    constructor(message,statusCode){
        super(message); //this super is the constructor for the parent class i.e Error
        this.statusCode = statusCode;
    }
};

//this is errorMiddleware function which is imported in app.js file
export const errorMiddleware = (err,req,res,next)=>{

    err.message = err.message || 'Internal Server Error'  //if no error message in error middleware of controllers is given then it will print the dafault message as Internal Server Error 
    err.statusCode = err.statusCode || 500  //if no error statusCode in error middleware of controllers is given then it will print the dafault statusCode as 500
    // console.log(err.message);

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
};

export default ErrorHandler;