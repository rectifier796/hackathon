import { generateResponse } from "../helpers/response.helper.js";
import userModel from "../model/user.model.js"

export const checkAdmin = async(req,res,next)=>{
    const user = await userModel.findOne({_id: req.userId});
    // console.log(user);
    if(!user){
        return generateResponse(res,400,"Unauthorized",null,false);
    }
    if(user.role==="Librarian"){
        next();
    }
    else
    return generateResponse(res,400,"Unauthorized",null,false);
}