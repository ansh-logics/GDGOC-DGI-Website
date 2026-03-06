import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { createEventController } from "../controllers/event.controller.js";

let router = express.Router()

router.post("/create", authMiddleware, upload.array("event_images"), createEventController)