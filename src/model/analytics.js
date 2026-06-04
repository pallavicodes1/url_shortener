import mongoose from "mongoose";
const analyticsSchema = new mongoose.Schema({
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortUrl",
        required: true
    },

    country: {
        type: String,
        required: true,
        unique: true
    },

    city: {
        type: Date,
        default: null
    },

    browser: {
        type: Date,
        default: null
    },
    os: {
        type: Date,
        default: null
    },
    device: {
        type: Date,
        default: null
    },
    clickedAt: {
        type: Date,
        default: null
    },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
