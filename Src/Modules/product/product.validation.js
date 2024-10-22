import joi from 'joi';
import { generalFields } from '../../Middleware/validation.js';

export const createProductSchema = {
    body: joi.object({
        name: joi.string().min(3).max(100).required().messages({
            'string.empty': 'Product name is required',
            'string.min': 'Product name must be at least 3 characters long',
            'string.max': 'Product name must be less than 100 characters'
        }),
        description: joi.string().min(10).max(1000).required().messages({
            'string.empty': 'Description is required',
            'string.min': 'Description must be at least 10 characters long',
            'string.max': 'Description must be less than 1000 characters'
        }),
        mainImage: generalFields.image.required().messages({
            'string.empty': 'Main image is required'
        }),
        subImages: joi.array().items(generalFields.image).optional(),
        price: joi.number().min(0).required().messages({
            'number.base': 'Price must be a valid number',
            'number.min': 'Price must be at least 0'
        }),
        discount: joi.number().min(0).max(100).default(0).messages({
            'number.min': 'Discount cannot be less than 0%',
            'number.max': 'Discount cannot be more than 100%'
        }),
        priceAfterDiscount: joi.number().required(),
        stock: joi.number().min(0).required().messages({
            'number.min': 'Stock must be at least 0'
        }),
        category: generalFields.id.required().messages({
            'string.empty': 'Category ID is required'
        }),
        subCategory: generalFields.id.required().messages({
            'string.empty': 'SubCategory ID is required'
        }),
        colors: joi.array().items(joi.string()).optional(),
        sizes: joi.array().items(joi.string()).optional(),
        status: joi.string().valid('active', 'inactive').default('inactive'),
    })
};

export const updateProductSchema = {
    body: joi.object({
        name: joi.string().min(3).max(100).optional(),
        description: joi.string().min(10).max(1000).optional(),
        mainImage: generalFields.image.optional(),
        subImages: joi.array().items(generalFields.image).optional(),
        price: joi.number().min(0).optional(),
        discount: joi.number().min(0).max(100).optional(),
        priceAfterDiscount: joi.number().optional(),
        stock: joi.number().min(0).optional(),
        category: generalFields.id.optional(),
        subCategory: generalFields.id.optional(),
        colors: joi.array().items(joi.string()).optional(),
        sizes: joi.array().items(joi.string()).optional(),
        status: joi.string().valid('active', 'inactive').optional(),
    }),
    params: joi.object({
        id: generalFields.id
    })
};
