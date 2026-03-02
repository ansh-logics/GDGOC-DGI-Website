import express from "express";
import { signupController, loginController, getMeController, updateProfilePhotoController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

let router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/me", authMiddleware, getMeController);
router.patch("/me/profile-photo", authMiddleware, upload.single("profile_photo"), updateProfilePhotoController);

export default router;