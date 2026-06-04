import express from "express";
import userRouter from "./src/routes/user/index.js"
import urlRouter from "./src/routes/url/index.js"
import authenticateToken from "./src/middleware/auth.js";
import cookieParser from "cookie-parser";

import get from "./src/routes/url/get.js";

const app=express();


app.use(cookieParser());
app.use(express.json());
app.use('/user',userRouter);
app.use('/url',authenticateToken,urlRouter);

app.get('/:shortCode',authenticateToken,get);

export default app;