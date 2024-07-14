import { generateResponse } from "../helpers/response.helper.js";
import userModel from "../model/user.model.js"

export const checkAdmin = async(req,res,next)=>{
    const user = await userModel.findOne({_id: req.userId});
    // console.log(req.userModel);
    if(!user){
        return generateResponse(res,400,"Unauthorized",null,false);
    }
    // console.log(hello);
    if(user.role==="Admin"){
        next();
    }
    else
    return generateResponse(res,400,"Unauthorized",null,false);
}