import joi from "joi";
import { generalFields } from "../../Middleware/validation.js";

export const registerSchema ={
    body:joi.object ({
        userName:joi.string().min(3).max(15).required().messages({
            'string.empty': 'username is required',
        }),
        email: generalFields.email,
        password: generalFields.password,
        cpassword: joi.valid(joi.ref('password')).required(),
        role: joi.string(),

    })
}
export const loginSchema ={
    body:joi.object({
        email:generalFields.email,
        password: generalFields.password,
    })
}