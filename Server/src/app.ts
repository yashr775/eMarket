import express  from "express";
import userRoute from "./routes/user.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"

dotenv.config({ path: ".env" });

const MONGOURL = process.env.MONGO_URL || "fvgfdgd";
console.log(MONGOURL)
const app = express();

connectDB(MONGOURL);

const PORT = 3000;

app.get("/",(req,res)=>{
    res.status(200).send("App working")
})

app.use("/api/v1/user",userRoute)

app.listen(PORT,()=>{
    console.log(`app  running on port ${PORT}`)
})