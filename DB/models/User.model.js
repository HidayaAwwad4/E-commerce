import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    userName :{
        type:String,
        required:true,
    },
    email :{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true,
    },
    image :{
        type:String,
    },
    phone :{
        type:String,
    },
    address :{
        type:String,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    gender :{
        type:String,
        enum:['Male','Female'],
    },
    status :{
        type:String,
        enum:['active ','not_active'],
    },
    role  :{
        type:String,
        enum:['user','admin'],
    }
},{
    timestamps:true,
});
const userModel =mongoose.model('User',userSchema);
export default userModel;