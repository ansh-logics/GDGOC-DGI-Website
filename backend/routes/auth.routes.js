import express from "express";
import { signupController } from "../controllers/auth.controller.js";
let router = express.Router();

router.post('/signup', signupController);
export default router;