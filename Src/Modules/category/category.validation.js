import joi from 'joi';
import { generalFields } from '../../Middleware/validation.js';

export const createCategorySchema = {
    body: joi.object({
        name: joi.string().min(3).max(30).required().messages({
            'string.empty': 'Category name is required',
            'string.min': 'Category name must be at least 3 characters long',
            'string.max': 'Category name must be less than 30 characters'
        }),
        image: generalFields.image.required().messages({
            'string.empty': 'Category image is required'
        }),
        status: joi.string().valid('active', 'not_active').default('not_active'),
    })
};

export const updateCategorySchema = {
    body: joi.object({
        name: joi.string().min(3).max(30).optional(),
        image: generalFields.image.optional(),
        status: joi.string().valid('active', 'not_active').optional(),
    }),
    params: joi.object({
        id: generalFields.id
    })
};
