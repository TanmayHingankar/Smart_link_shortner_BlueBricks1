import mongoose from "mongoose";

const clickEventSchema = new mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
      index: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },

    referrer: {
      type: String,
      default: "Direct",
    },

    userAgent: {
      type: String,
      default: "",
    },

    ipHash: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "Unknown",
    },
  },
  {
    timestamps: false,
  }
);

export const ClickEvent = mongoose.model("ClickEvent", clickEventSchema);

export default ClickEvent;