import jwt from "jsonwebtoken";
import userModel from '../../DB/models/User.model.js';
export const roles ={
    Admin : 'admin',
    User : 'user',
}
export const auth = (accessRole = []) =>{
    return async(req,res,next)=>{
        try{
            const {authorization}= req.headers;
            if(!authorization || !authorization.startsWith(process.env.BERERTOKEN)){
                return res.status(400).json({message:"invalid token"});
            }
            const token = authorization.split(process.env.BERERTOKEN)[1];
            const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);
            if(!decoded){
                return res.status(400).json({message:"invalid token"});
            }
            req.id = decoded.id;
            const user = await userModel.findById(req.id).select("userName role");
            if(!accessRole.includes(user.role)){
                return res.status(403).json({message:"You dont have Authorization"});
            }
            next();
        }catch(err){
            return res.status(500).json({message:"catch error",error:err.stack});
        }
    }
}
