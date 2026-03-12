import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { addBannerController, addThumbnailController, createEventController, deleteEventController, getEventBySlugController, getEventsController, updateEventController } from "../controllers/event.controller.js";

let router = express.Router()

// Public read routes
router.get("/", getEventsController);
router.get("/:slug", getEventBySlugController);

// Protected write routes
router.post("/", authMiddleware, createEventController);
router.patch("/:eventId/add-thumbnail", authMiddleware, upload.single("thumbnail"), addThumbnailController);
router.patch("/:eventid/add-banner", authMiddleware, upload.single("banner"), addBannerController);
router.patch("/:eventId", authMiddleware, updateEventController);
router.delete("/:eventId", authMiddleware, deleteEventController);


export default router;