import express  from "express";
import userRoute from "./routes/user.js"
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({ path: ".env" });

const MONGOURL = process.env.MONGO_URL || "fvgfdgfd";
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json());

connectDB(MONGOURL);



app.get("/",(req,res)=>{
    res.status(200).send("App working")
})

app.use("/api/v1/user",userRoute)

app.use(errorMiddleware);
app.listen(PORT,()=>{
    console.log(`app  running on port ${PORT}`)
})