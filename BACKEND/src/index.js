import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AIRouter from "./routes/AIRoute.jsx";

dotenv.config();
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use("/ai", AIRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})  


