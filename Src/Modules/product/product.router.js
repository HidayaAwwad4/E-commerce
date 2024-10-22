import express from 'express';
import { productController } from './path/to/productController'; 
import { auth } from './path/to/authMiddleware'; 
import { roles } from './path/to/roles';
import multer from 'multer'; 
const router = express.Router();
const upload = multer();

router.post('/', auth([roles.Admin]), upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'subImages', maxCount: 5 }]), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', auth([roles.Admin]), productController.deleteProduct);

export default router;
