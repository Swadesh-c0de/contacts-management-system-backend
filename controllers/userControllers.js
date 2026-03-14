import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//@desc Register the user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("User created:", user);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
})

//@desc Login the user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });

    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is not valid");
    }
})

//@desc Current user info
//@route GET /api/users/profile
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

//@desc Logout the user
//@route GET /api/users/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ message: "User logged out" });
})

export { registerUser, loginUser, currentUser, logoutUser };