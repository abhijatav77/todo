import User from "../module/UserModule.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false
        });
    }
};

export const login = async (req, res) =>{
    try {
        const {email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "Email and password are required",
                success : false
            })
        }
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message : "Invalid email or password",
                success : false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({
                message : "Invalid email or password",
                success : false
            })
        }

        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn : "1h"})

        res.cookie("token", token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge : 3600000
        })

        return res.status(200).json({
            message : "Login successful",
            success : true,
            token : token
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "internal server error" || error.message,
            success : false
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", null,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict"
        })

        return res.status(200).json({
            message : "Logout successful",
            success : true
        })

    }
    catch (error) {
        return res.status(500).json({
            message : "internal server error" || error.message,
            success : false
        })
    }
}