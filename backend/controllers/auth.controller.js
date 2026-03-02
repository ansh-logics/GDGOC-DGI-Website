import { signup, login, getMe, updateProfilePhoto } from "../services/auth.service.js";

export async function signupController(req, res) {
    try {
        const result = await signup(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}

export async function loginController(req, res) {
    try {
        const result = await login(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}

export async function getMeController(req, res) {
    try {
        const result = await getMe(req.userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}

export async function updateProfilePhotoController(req, res) {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const result = await updateProfilePhoto(req.userId, req.file.path);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
}
