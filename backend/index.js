import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./connectDb.js";
import authRouter from "./routes/auth.routes.js";
import eventRouter from "./routes/event.routes.js"

dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error("Missing JWT_SECRET in .env");
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

// ✅ CORS CONFIG
const allowedOrigins = [
    "https://www.gdgdronacharya.site",
    "https://gdgdronacharya.site",
    "http://localhost:3000",
    "http://localhost:3001"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/test", (req, res) => {
    res.send("Backend running ✅");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/event", eventRouter);

app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) return next(err);
    res.status(500).json({
        error: err?.message || "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log("Server running on PORT =", PORT);
});