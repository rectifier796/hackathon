
export const parseData = async(req,res,next)=>{
    req.body=req.fields;
    next();
}