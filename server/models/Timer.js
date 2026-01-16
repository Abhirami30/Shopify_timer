import mongoose from "mongoose";

/**
 * Timer Schema
 * Represents a countdown timer configuration created by a merchant
 */
/**
 * Example FIXED timer:
 * {
 *   type: "FIXED",
 *   startAt: "2025-01-01T00:00:00Z",
 *   endAt: "2025-01-10T23:59:59Z"
 * }
 *
 * Example EVERGREEN timer:
 * {
 *   type: "EVERGREEN",
 *   durationSeconds: 1800
 * }
 */

const TimerSchema = new mongoose.Schema(
  {
    // Which Shopify store owns this timer
    shop: {
      type: String,
      required: true,
    },

    // FIXED or EVERGREEN
    type: {
      type: String,
      enum: ["FIXED", "EVERGREEN"],
      required: true,
    },

    // Used only for FIXED timers
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },

    // Used only for EVERGREEN timers (in seconds)
    durationSeconds: {
      type: Number,
    },

    // Targeting (keeping it simple: product-level only)
    productId: {
      type: String,
      required: true,
    },

    // Copy shown in the UI
    headline: {
      type: String,
      required: true,
    },
    subtext: {
      type: String,
    },

    // Basic analytics
    impressions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

export default mongoose.model("Timer", TimerSchema);
