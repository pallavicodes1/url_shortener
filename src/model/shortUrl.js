import mongoose from "mongoose";
const shortUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },

  shortCode: {
    type: String,
    required: true,
    unique: true
  },

  expiresAt: {
    type: Date,
    default:null
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  totalClicks: {
    type: Number,
    default: 0
  }
});
 
const ShortUrl=mongoose.model("ShortUrl",shortUrlSchema);
export default ShortUrl;
