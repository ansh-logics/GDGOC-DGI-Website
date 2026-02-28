import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { connectdb } from "./connectDb.js";
import authRouter from "./routes/auth.routes.js"
dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error("Missing JWT_SECRET in .env. Add a value like: JWT_SECRET=your-secret-key");
    process.exit(1);
}

try {
    let message = await connectdb();
    console.log(message);
} catch (error) {
    console.log(error.message);
}

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");

app.use(
    cors({
        origin: [
            "https://www.gdgdronacharya.site",
            "https://gdgdronacharya.site",
            "http://localhost:3000",
        ],
        credentials: true
    })
);
app.use(express.json());

app.get("/test", (req, res) => {
    res.send("This hits the backend and it's running");
});
app.use("/api/v1", authRouter)

app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        error: err?.message || "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log("server is running on PORT = ", PORT);
});
