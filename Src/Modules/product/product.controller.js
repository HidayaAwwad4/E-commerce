import Product from '../../../DB/models/Product.model.js';
import cloudinary from '../../Utils/cloudinary.js';

export const createProduct = async (req, res) => {
    try {
        req.body.name = req.body.name.toLowerCase();

        if (req.files.mainImage) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
                folder: `${process.env.APPNAME}/products/main`
            });
            req.body.mainImage = secure_url;
        }
        if (req.files.subImages) {
            req.body.subImages = await Promise.all(req.files.subImages.map(async (file) => {
                const { secure_url } = await cloudinary.uploader.upload(file.path, {
                    folder: `${process.env.APPNAME}/products/main/sub`
                });
                return secure_url;
            }));
        }
        req.body.priceAfterDiscount = req.body.price - (req.body.price * (req.body.discount / 100));

        const product = await Product.create(req.body);
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        return res.status(500).json({ message: "Error creating product", error: error.stack });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category subCategory');
        return res.status(200).json({ message: "Products retrieved successfully", data: products });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching products", error: error.stack });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('category subCategory');

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product retrieved successfully", data: product });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching product", error: error.stack });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; 
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.mainImage) {
            const publicId = product.mainImage.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }

        await Promise.all(product.subImages.map(async (image) => {
            const publicId = image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }));

        return res.status(200).json({ message: "Product deleted successfully", data: product });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product", error: error.stack });
    }
};
