import mongoose from "mongoose";
const analyticsSchema = new mongoose.Schema({
    urlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShortUrl",
        required: true
    },

    country: {
        type: String,
       
    },

    browser: {
        type: String,
       
    },
    os: {
        type: String,
       
    },
    device: {
        type: String,
       
    },
    clickedAt: {
        type: Date,
        default: null
    },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
