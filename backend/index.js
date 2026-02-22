import express from "express"
import dotenv from 'dotenv'
import { connectdb } from "./connectDb.js";
import authRouter from "./routes/auth.routes.js"
dotenv.config();
try {
    let message = await connectdb();
    console.log(message);
} catch (error) {
  console.log(error.messsage);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/test", (req, res)=>{
    res.send("This hits the backend and it's running");
});
app.use("/api/v1", authRouter)

app.listen(PORT,()=>{
    console.log("server is running on PORT = ", PORT);
});
