import express from "express";
import connectDB from './src/config/connectDB.js';
import app from "./app.js"
import dotenv from "dotenv"


dotenv.config();
const port=process.env.port || 5000;

connectDB();

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})