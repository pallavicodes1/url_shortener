import express from "express";
import userRouter from "./src/routes/user/index.js"
import urlRouter from "./src/routes/url/index.js"
import authenticateToken from "./src/middleware/auth.js";
import cookieParser from "cookie-parser";
import analyticsRouter from "./src/routes/analytics/index.js";

import get from "./src/routes/url/get.js";

const app=express();

app.set('trust proxy', true);
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use(cookieParser());
app.use(express.json());
app.use('/user',userRouter);
app.use('/url',authenticateToken,urlRouter);
app.use('/analytics',authenticateToken,analyticsRouter);
app.get('/:shortCode',get);
export default app;