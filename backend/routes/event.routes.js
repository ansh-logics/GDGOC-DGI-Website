import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { addBannerController, addThumbnailController, createEventController, createRegistrationFormController, deleteEventController, getEventBySlugController, getEventsController, getRegistrationFormController, registerInEventController, updateEventController } from "../controllers/event.controller.js";

let router = express.Router()

// Public read routes
router.get("/", getEventsController);
router.get("/:slug", getEventBySlugController);

// Protected write routes
router.get("/registration-form/:slug", authMiddleware, getRegistrationFormController);
router.post("/", authMiddleware, createEventController);
router.post("/registration-form", authMiddleware, createRegistrationFormController);
router.post("/register", authMiddleware, registerInEventController)
router.patch("/:eventId/add-thumbnail", authMiddleware, upload.single("thumbnail"), addThumbnailController);
router.patch("/:eventid/add-banner", authMiddleware, upload.single("banner"), addBannerController);
router.patch("/:eventId", authMiddleware, updateEventController);
router.delete("/:eventId", authMiddleware, deleteEventController);


export default router;