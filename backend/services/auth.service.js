import User from "../models/user.model.js";

export async function signup(data) {
    try {
        const existing = await User.findOne({ email: data.email });

        if (existing) {
            throw new Error("User already exists");
        }

        const user = await User.create({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            course: data.course,
            branch: data.branch
        });

        return {
            message: "User created",
            username: user.firstName
        };

    } catch (err) {
        throw err; // pass error upward
    }
}