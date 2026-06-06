import express from "express";
import get from "./get.js";
const router=express.Router();
router.get('/',get);
export default router; 