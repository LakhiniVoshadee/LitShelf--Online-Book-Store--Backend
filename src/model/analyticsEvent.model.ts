import mongoose from "mongoose";

const analyticsEventModel = new mongoose.Schema(
    {
        id: {
            required: true,
            type: Number,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        eventType: {
            required: true,
            type: String,
        },
        eventData: {
            required: true,
            type: Object,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsEventModel);

export default AnalyticsEvent;