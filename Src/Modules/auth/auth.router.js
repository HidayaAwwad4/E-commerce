import { Router } from "express";
const router = Router();
import * as authController from './auth.controller.js';
import validation from '../../Middleware/validation.js';
import {registerSchema,loginSchema} from "./auth.validation.js";
import fileUpload from "../../Utils/multer.js";


router.post('/register',fileUpload().single('image'),validation(registerSchema),authController.register);
router.post('/login',validation(loginSchema),authController.login);



export default router;