import mongoose from "mongoose";
import bcrypt from "bcrypt";

const bookSchema = new mongoose.Schema({
    isbn:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:[{
        type:String,
        required:true
    }],
    publishedDate:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:false,
        default:null
    },
    quantity:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
        default:null
    },
    smallThumbnail:{
        type:String,
        default:null
    },
    language:{
        type:String,
    },
    searchInfo:{
        type:String,
    },
    no_of_issue:{
        type:Number,
        default:0
    }
},{timestamps:true});

export default mongoose.model("Book",bookSchema);