import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Contact from '../models/contactModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateEmail, validatePassword } from '../utils/validation.js';

//@desc Register the user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    email = email.toLowerCase();

    if (!validateEmail(email)) {
        res.status(400);
        throw new Error("Invalid email address format!");
    }

    const errors = validatePassword(password);

    if (errors.length > 0) {
        res.status(400);
        throw new Error(`Password must contain ${errors.join(", ")}`);
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
    let { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    email = email.toLowerCase();
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
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json({
        id: user.id,
        username: user.username,
        email: user.email
    });
})

//desc Current user profile update
//@route PUT /api/users/profile
//@access private
const updateProfile = asyncHandler(async (req, res) => {
    let { username, email } = req.body;

    if (!username && !email) {
        res.status(400);
        throw new Error("Please provide at least one field to update!");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (username) {
        user.username = username;
    }

    if (email) {
        email = email.toLowerCase();
        if (!validateEmail(email)) {
            res.status(400);
            throw new Error("Invalid email address format!");
        }

        const emailInUse = await User.findOne({ email, _id: { $ne: req.user.id } });
        if (emailInUse) {
            res.status(400);
            throw new Error("Email address already taken!");
        }
        user.email = email;
    }

    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
    });
});

//@desc Change user password
//@route PUT /api/users/change-password
//@access private
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
        res.status(401);
        throw new Error("Current password is incorrect");
    }

    const errors = validatePassword(newPassword);

    if (errors.length > 0) {
        res.status(400);
        throw new Error(`Password must contain ${errors.join(", ")}`);
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
});

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

//@desc Delete user profile
//@route DELETE /api/users/profile
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await Contact.deleteMany({ user_id: req.user.id });

    await User.findByIdAndDelete(req.user.id);

    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ message: "User and associated contacts deleted successfully" });
});


export { registerUser, loginUser, currentUser, updateProfile, changePassword, logoutUser, deleteUser };
