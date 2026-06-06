import express from "express";
import postUrl from "./postUrl.js";
import get from "./get.js";
import getUrl from "./getUrl.js";
const router=express.Router();
router.post('/',postUrl);
router.get('/:shortCode',getUrl);
export default router;