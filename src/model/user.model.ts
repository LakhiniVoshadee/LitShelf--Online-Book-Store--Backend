import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number,
        unique: true,
    },
    username: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: String,
        enum: ['admin', 'customer'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Pre-save hook to update the updatedAt timestamp
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const User = mongoose.model("User", userSchema);

export default User;
