import express from "express";
import postUrl from "./postUrl.js";
const router=express.Router();
router.post('/',postUrl);
export default router;