import adminModel from "../models/admin.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const adminRegister = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, username and password are required.",
            });
        }
        const newUsername = username.toUpperCase();

        const existing = await adminModel.findOne({ username: newUsername });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Admin credentials already exists",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newAdmin = new adminModel({ name: name, username: newUsername, password: hashedPassword })
        await newAdmin.save();

        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: "Admin registered successfully",
            token
        });
    } catch (error) {
        console.error("Error in registering admin - backend : ", error);
        res.status(400).json({
            success: false,
            message: "Admin registering API crashed",
            error: error.message
        })
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Usernme and password are required.",
            }, {
                headers: { "Content-Type": "application/json" }
            });
        }

        const newUsername = username.toUpperCase();
        const user = await adminModel.findOne({ username: newUsername });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            message: 'Login successfull',
            token,
        });

    } catch (error) {
        console.error("User authentication failed!", error);
        return res.status(500).json({
            success: false,
            message: "User authentication API crashed - backend",
            error: error.message
        });
    }
};

export const adminVerify = async (req, res) => {
    try {
        const user = await adminModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message
        });
    }
};

export const adminStats = async (req, res) => {
    try {
        const totalAdmins = await adminModel.countDocuments();
        res.status(200).json({
            success: true,
            totalAdmins
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Admin stats API crashed - backend',
            error: error.message
        });
    }
};