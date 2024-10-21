import userModel from '../../../DB/models/User.model.js';
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try{
        const {userName, email, password,role} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            return res.status(409).json({message:"Email already exists"});
        }
        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALROUND));
        await userModel.create({
            userName,
            email,
            password: hashPassword,
            role
        });
        return res.status(201).json({message:"success"});
    }catch(error){
        return res.status(500).json({message:"catch error",error:error.stack});
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password}= req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message:"email not found"});
        }
        const check = await bcrypt.compareSync(password,user.password);
        if(!check){
            return res.status(400).json({message:"invalid password"});
        }
        const token = jwt.sign({id:user._id},process.env.LOGINSIGNATURE,{expiresIn:'1h'});
        return res.status(200).json({Message:"success",token});
    }catch(error){
        return res.status(500).json({message:'catch error',error});
    }
}