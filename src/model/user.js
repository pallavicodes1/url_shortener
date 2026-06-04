import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    }
})

userSchema.pre("save",async function(){
    try {
         this.password=await bcrypt.hash(this.password,10);
    } catch (error) {
        console.log(error);   
    }
   
})

userSchema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id.toString()},process.env.JWTSECRET);
        return token;
    }     
    catch(err){
        console.log('error is',err);    
    } 
}
const User=mongoose.model("User",userSchema);
export default User;