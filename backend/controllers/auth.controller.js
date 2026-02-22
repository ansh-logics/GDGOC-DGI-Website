import { signup } from "../services/auth.service.js";
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
