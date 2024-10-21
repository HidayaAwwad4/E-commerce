import { Router } from "express";
const router = Router();
import * as categoryController from './category.controller.js';
import { auth, roles } from "../../Middleware/auth.js";
import fileUpload from "../../Utils/multer.js";

router.post('/', auth([roles.Admin]), fileUpload().single('image'), categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id',auth([roles.Admin,roles.User]), categoryController.getCategoryById);
router.put('/:id', auth([roles.Admin]), fileUpload().single('image'), categoryController.updateCategory);
router.delete('/:id',auth([roles.Admin]), categoryController.deleteCategory);


export default router;
