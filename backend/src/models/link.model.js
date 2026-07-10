import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    longUrl: {
      type: String,
      required: true,
      trim: true,
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customAlias: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

linkSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const Link = mongoose.model("Link", linkSchema);

export default Link;