import mongoose, { Schema, Types } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mainImage: {
        type: String, 
        required: true,
    },
    subImages: {
        type: [String], 
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0, 
    },
    priceAfterDiscount: {
        type: Number,
        required: true, 
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subCategory: {
        type: Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    colors: {
        type: [String],
    },
    sizes: {
        type: [String], 
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    createdBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
    updatedBy: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const productModel = mongoose.model('Product', productSchema);
export default productModel;
