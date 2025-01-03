import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    var server = ''
    switch (process.env.NODE_ENV) {
        case "development":
            server = 'MVC'
            break;
        case "production":
            server = process.env.CLUSTER
            break;
        default:
            break;
    }

    try {
      await mongoose.connect(`${process.env.URI_MONGO}/?retryWrites=true&w=majority&appName=${server}"`)
        console.log("DATABASE CONEXION SUCESSFULL")
    } catch (e) {
        console.error("ERROR CONEXION :" + e.message);
    }
}
connectDB()
