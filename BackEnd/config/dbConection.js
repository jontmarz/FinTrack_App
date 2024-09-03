import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.URI_MONGO, {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      })
        console.log("DATABASE CONEXION SUCESSFULL")
    } catch (e) {
        console.error("ERROR CONEXION :" + e.message);
    }
}
connectDB()