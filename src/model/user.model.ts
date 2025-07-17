import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        "id": {
            required: true,
            type: Number,
            unique: true,
        },
        "email": {
            required: true,
            type: String,
            unique: true,
        },
        "password": {
            required: true,
            type: String,
        },
        "name": {
            required: true,
            type: String,
        },
        "role": {
            required: true,
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        "createdAt": {
            type: Date,
            default: Date.now,
        },
        "updatedAt": {
            type: Date,
            default: Date.now,
        },
    }
);

const User = mongoose.model('User', userModel);

export default User;