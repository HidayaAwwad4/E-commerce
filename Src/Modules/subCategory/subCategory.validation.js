import joi from 'joi';
import { generalFields } from '../../Middleware/validation.js';

export const createSubCategorySchema = {
    body: joi.object({
        name: joi.string().min(3).max(30).required().messages({
            'string.empty': 'SubCategory name is required',
            'string.min': 'SubCategory name must be at least 3 characters long',
            'string.max': 'SubCategory name must be less than 30 characters'
        }),
        image: generalFields.image.required().messages({
            'string.empty': 'SubCategory image is required'
        }),
        status: joi.string().valid('active', 'not_active').default('not_active'),
        categoryId: generalFields.id.required().messages({
            'string.empty': 'Category ID is required'
        })
    })
};

export const updateSubCategorySchema = {
    body: joi.object({
        name: joi.string().min(3).max(30).optional(),
        image: generalFields.image.optional(),
        status: joi.string().valid('active', 'not_active').optional(),
        categoryId: generalFields.id.optional(),
    }),
    params: joi.object({
        id: generalFields.id
    })
};
