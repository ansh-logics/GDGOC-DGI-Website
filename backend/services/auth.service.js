import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

function createToken(user) {
    return jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
}

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

        const token = createToken(user);
        return {
            message: "User created",
            username: user.firstName,
            token
        };

    } catch (err) {
        throw err;
    }
}

export async function login(data) {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const match = await user.comparePassword(data.password);
        if (!match) {
            throw new Error("Invalid email or password");
        }
        const token = createToken(user);
        return {
            message: "Login successful",
            username: user.firstName,
            token
        };
    } catch (err) {
        throw err;
    }
}

export async function getMe(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

export async function updateProfilePhoto(userId, photoUrl) {
    const user = await User.findByIdAndUpdate(
        userId,
        { profile_photo: photoUrl },
        { new: true }
    ).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}