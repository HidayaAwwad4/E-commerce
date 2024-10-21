import categoryModel from "../../../DB/models/Category.model.js";
import cloudinary from '../../Utils/cloudinary.js';

export const createCategory = async(req, res) => {
    try {
        req.body.name = req.body.name.toLowerCase();
        const categoryExists = await categoryModel.findOne({ name: req.body.name });
        if (categoryExists) {
                return res.status(400).json({ message: "Category name already exists" });
        }
        if (req.file) {
            try {
                const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
                    folder: `${process.env.APPNAME}/category`
                });
                req.body.image = secure_url;
                req.body.imagePublicId = public_id;  
            } catch (error) {
                return res.status(500).json({ message: "Image upload failed", error: error.stack });
            }
        }
        req.body.createdBy = req.body.updatedBy = req.id;
        const category = await categoryModel.create(req.body);
        return res.status(200).json({ message: "success" , category});
    } catch (error) {
        return res.status(500).json({ message: "catch error", error: error.stack });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find(); 
        return res.status(200).json({ message: "success", data: categories });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching categories", error: error.stack });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ message: "success", data: category });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching category", error: error.stack });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let category = await categoryModel.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (req.body.name) {
            req.body.name = req.body.name.toLowerCase();
            const categoryExists = await categoryModel.findOne({ name: req.body.name });
            if (categoryExists && categoryExists._id.toString() !== id) {
                return res.status(400).json({ message: "Category name already exists" });
            }
        }

        if (req.file) {
            try {
                if (category.imagePublicId) {
                    await cloudinary.uploader.destroy(category.imagePublicId);
                }
                const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
                    folder: `${process.env.APPNAME}/category`
                });

                req.body.image = secure_url;
                req.body.imagePublicId = public_id;
            } catch (error) {
                return res.status(500).json({ message: "Image upload failed", error: error.stack });
            }
        }

        req.body.updatedBy = req.id;
        category = await categoryModel.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ message: "Category updated successfully", data: category });
    } catch (error) {
        return res.status(500).json({ message: "Error updating category", error: error.stack });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        if(req.role !== 'admin'){
            return res.status(400).json({message:"Only admins can delete categories"}); 
        }
        const { id } = req.params; 
        const category = await categoryModel.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await cloudinary.uploader.destroy(category.imagePublicId);
        return res.status(200).json({ message: "success", data: category });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting category", error: error.stack });
    }
};
