import mongoose from 'mongoose';
const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.DB_LOCAL);
        console.log("Connect DB");
    }catch(err){
        console.log("error to connect db:",err);
    }
}
export default connectDb;