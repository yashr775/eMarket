import dotenv from "dotenv";
import mongoose from "mongoose";




export const connectDB = (uri:string) => {
  mongoose
    .connect(uri,{dbName:"eMarket"})
    .then((c) => console.log(`DB Connected to ${c.connection.host}`))
    .catch((e) => console.error(e.message));
};
