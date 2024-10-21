import { Router } from "express";
import { subCategoryController } from './path/to/subCategoryController'; 
import { auth } from './path/to/authMiddleware';
import { roles } from './path/to/roles';
import fileUpload from 'multer'; 
const router = Router();

router.post('/', auth([roles.Admin]), fileUpload().single('image'), subCategoryController.createSubCategory);
router.get('/', subCategoryController.getAllSubCategories);
router.get('/:id', auth([roles.Admin, roles.User]), subCategoryController.getSubCategoryById);
router.put('/:id', auth([roles.Admin]), fileUpload().single('image'), subCategoryController.updateSubCategory);
router.delete('/:id', auth([roles.Admin]), subCategoryController.deleteSubCategory);

export default router;
