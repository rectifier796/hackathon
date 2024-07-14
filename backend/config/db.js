import mongoose from "mongoose";
import colors from 'colors';

export const connectDB = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To MongoDB ${connection.connection.host}`.bgGreen.black);
    }
    catch(err){
        console.log(`Error while MongoDB connection : ${err}`.bgRed.white);
    }
}