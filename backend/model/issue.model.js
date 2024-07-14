import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    issueDate:{
        type:Date,
        required:true
    },
    isReturned:{
        type:Boolean,
        required:true,
        default:false
    },
    isFinePaid:{
        type:Boolean,
        required:true,
        default:false
    },
    fine:{
        type:Number,
        default : 0
    }
},{timestamps:true});

export default mongoose.model("Issue",issueSchema);