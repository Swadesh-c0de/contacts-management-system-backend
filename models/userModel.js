import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the username"],
        },
        email: {
            type: String,
            required: [true, "Please add the user email address"],
            unique: [true, "Email address already taken"],
        },
        password: {
            type: String,
            required: [true, "Please add the user password"],
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);