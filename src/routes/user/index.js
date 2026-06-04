import express from "express";
import post from "./post.js";
import login from "./login.js";
const router=express.Router();
router.post('/',post);
router.post('/login',login);
export default router;