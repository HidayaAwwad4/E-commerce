import mongoose, {Schema,Types} from "mongoose";

const categorySchema = new Schema({
    name :{
        type:String,
        required:true,
    },
    image :{
        type:String,
    },
    status :{
        type:String,
        enum:['active ','not_active'],
    },
    createdBy :{
        type:Types.objectId,
        required:true,
        ref:'User',
    },
    updatedBy :{
        type:Types.objectId,
        required:true,
        ref:'User',
    }
},{
    timestamps:true,
});
const categoryModel =mongoose.model('Category',categorySchema);
export default categoryModel;