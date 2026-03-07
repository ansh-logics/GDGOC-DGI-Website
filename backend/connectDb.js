import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
let MONGO_URL = process.env.MONGO_CONNECTION;

export async function connectdb(){
    try{
        await mongoose.connect(MONGO_URL);
        return "Db connected Successfully"
    }catch(err){
        throw new Error("Db not connected check uri");
    }
}
