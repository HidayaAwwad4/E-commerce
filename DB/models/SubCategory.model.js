import mongoose, {Schema,Types} from "mongoose";

const subCategorySchema = new Schema({
    name :{ 
        type: String,
        required: true, 
        unique: true
    },
    image: { 
        type: String
    },
    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    },
    categoryId: { 
        type: Types.ObjectId,
        ref: 'Category', 
        required: true 
    },
    createdBy: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    updatedBy: { 
        type: Types.ObjectId,
        ref: 'User' 
    },
},{ 
    timestamps: true 
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
export default SubCategory;
