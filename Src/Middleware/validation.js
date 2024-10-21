import joi from "joi";
const dataMethods = ['body','params','query'];
export const generalFields= {
    email: joi.string().email().min(6).max(50).required(),
    password: joi.string().min(8).required(),
}
const validation = (schema)=>{
    const validationArray = [];
    return (req,res,next)=>{
        dataMethods.forEach(key=>{
            if(schema[key]){
                const validationResult = schema[key].validate(req[key],{abortEarly:false});
                if(validationResult.error){
                    validationArray.push(validationResult.error.details);
                }
            }
        });
        if(validationArray.length > 0){
            return res.status(400).json({message:"validation Error",Errors:validationArray});
        }else{
            next();
        }
    }
} 
export default validation;