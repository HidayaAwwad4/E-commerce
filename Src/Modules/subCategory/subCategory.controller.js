import SubCategory from '../../../DB/models/SubCategory.model.js';
import cloudinary from '../../Utils/cloudinary.js';

export const createSubCategory = async (req, res) => {
    try {
        req.body.name = req.body.name.toLowerCase();
        const subCategoryExists = await SubCategory.findOne({ name: req.body.name });
        if (subCategoryExists) {
            return res.status(400).json({ message: "Sub-category name already exists" });
        }

        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
                folder: `${process.env.APPNAME}/sub-category`
            });
            req.body.image = secure_url;
            req.body.imagePublicId = public_id;  
        }

        req.body.createdBy = req.body.updatedBy = req.id;
        const subCategory = await SubCategory.create(req.body);
        return res.status(201).json({ message: "Sub-category created successfully", subCategory });
    } catch (error) {
        return res.status(500).json({ message: "Error creating sub-category", error: error.stack });
    }
};

export const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('categoryId', 'name');
        return res.status(200).json({ message: "Sub-categories retrieved successfully", data: subCategories });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching sub-categories", error: error.stack });
    }
};

export const getSubCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subCategory = await SubCategory.findById(id).populate('categoryId', 'name');

        if (!subCategory) {
            return res.status(404).json({ message: "Sub-category not found" });
        }

        return res.status(200).json({ message: "Sub-category retrieved successfully", data: subCategory });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching sub-category", error: error.stack });
    }
};

export const updateSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let subCategory = await SubCategory.findById(id);

        if (!subCategory) {
            return res.status(404).json({ message: "Sub-category not found" });
        }

        if (req.body.name) {
            req.body.name = req.body.name.toLowerCase();
            const subCategoryExists = await SubCategory.findOne({ name: req.body.name });
            if (subCategoryExists && subCategoryExists._id.toString() !== id) {
                return res.status(400).json({ message: "Sub-category name already exists" });
            }
        }

        if (req.file) {
            if (subCategory.imagePublicId) {
                await cloudinary.uploader.destroy(subCategory.imagePublicId);
            }
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
                folder: `${process.env.APPNAME}/sub-category`
            });
            req.body.image = secure_url;
            req.body.imagePublicId = public_id;
        }

        req.body.updatedBy = req.id;
        subCategory = await SubCategory.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ message: "Sub-category updated successfully", data: subCategory });
    } catch (error) {
        return res.status(500).json({ message: "Error updating sub-category", error: error.stack });
    }
};

export const deleteSubCategory = async (req, res) => {
    try {
        if (req.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can delete sub-categories" }); 
        }
        const { id } = req.params; 
        const subCategory = await SubCategory.findByIdAndDelete(id);
        if (!subCategory) {
            return res.status(404).json({ message: "Sub-category not found" });
        }
        if (subCategory.imagePublicId) {
            await cloudinary.uploader.destroy(subCategory.imagePublicId);
        }
        return res.status(200).json({ message: "Sub-category deleted successfully", data: subCategory });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting sub-category", error: error.stack });
    }
};
