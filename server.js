import express from "express";
import connectDB from './src/config/connectDB.js';
import app from "./app.js"
import dotenv from "dotenv"


dotenv.config();
const port=process.env.port || 5000;

connectDB("mongodb://localhost:27017/url_shortener");

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})