import mongoose, {Schema,Types} from "mongoose";

const categorySchema = new Schema({
    name :{
        type:String,
        required:true,
    },
    image :{
        type:String,
        required:true,
    },
    imagePublicId :{
        type:String,
        required:true,
    },
    status :{
        type:String,
        enum:['active ','not_active'],
        default:'not_active',
    },
    createdBy :{
        type:Types.ObjectId,
        required:true,
        ref:'User',
    },
    updatedBy :{
        type:Types.ObjectId,
        required:true,
        ref:'User',
    }
},{
    timestamps:true,
});
const categoryModel =mongoose.model('Category',categorySchema);
export default categoryModel;