import mongoose from "mongoose";
const connectDB=async function(url){
     try {
        await mongoose.connect(url);
        console.log("database connected");
     } catch (error) {
        
     }
}
export default connectDB;