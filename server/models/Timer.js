/**
 * Timer Model
 * -----------
 * This schema represents a countdown timer created by a merchant.
 * I kept it simple and readable, focusing on core requirements:
 * - Fixed timers
 * - Evergreen timers
 * - Basic targeting
 * - Simple analytics
 *
 * This is my first implementation while learning MERN,
 * so the structure is intentionally clear over complex.
 */

import mongoose from "mongoose";

const TimerSchema = new mongoose.Schema(
  {
    /**
     * Store identifier
     * Used for multi-tenant isolation (multiple Shopify stores)
     */
    shop: {
      type: String,
      required: true,
      index: true, // helps when querying timers per store
    },

    /**
     * Name shown in Admin UI
     * Helps merchants identify timers easily
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * Timer type
     * FIXED    -> same end time for all users
     * EVERGREEN -> resets per visitor
     */
    type: {
      type: String,
      enum: ["FIXED", "EVERGREEN"],
      required: true,
    },

    /**
     * FIXED timer fields
     * These are ignored for evergreen timers
     */
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },

    /**
     * EVERGREEN timer field
     * Duration is stored in seconds
     * Example: 30 minutes = 1800 seconds
     */
    durationSeconds: {
      type: Number,
    },

    /**
     * Targeting rules
     * For now, kept simple:
     * - ALL products
     * - Specific products
     *
     * Collection-level targeting can be added later
     */
    targeting: {
      scope: {
        type: String,
        enum: ["ALL", "PRODUCT"],
        default: "ALL",
      },
      productIds: {
        type: [String], // Shopify product GIDs
        default: [],
      },
    },

    /**
     * UI configuration for storefront widget
     * These values control how the timer is displayed
     */
    ui: {
      headline: {
        type: String,
        maxlength: 120,
      },
      subtext: {
        type: String,
        maxlength: 200,
      },
      position: {
        type: String,
        enum: ["ABOVE_PRICE", "BELOW_PRICE"],
        default: "BELOW_PRICE",
      },
      urgencyStyle: {
        type: String,
        enum: ["NONE", "COLOR_PULSE"],
        default: "NONE",
      },
    },

    /**
     * Basic analytics
     * Only impressions are tracked for simplicity
     */
    analytics: {
      impressions: {
        type: Number,
        default: 0,
      },
    },

    /**
     * Timer status
     * Stored mainly to simplify admin UI display
     * Updated based on current time
     */
    status: {
      type: String,
      enum: ["SCHEDULED", "ACTIVE", "EXPIRED"],
      default: "SCHEDULED",
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

/**
 * Helper method to compute timer status.
 * This avoids duplicating logic in multiple places.
 */
TimerSchema.methods.computeStatus = function () {
  const now = new Date();

  // Fixed timer logic
  if (this.type === "FIXED") {
    if (this.startAt && now < this.startAt) {
      return "SCHEDULED";
    }
    if (this.endAt && now > this.endAt) {
      return "EXPIRED";
    }
    return "ACTIVE";
  }

  // Evergreen timers are always active by design
  return "ACTIVE";
};

export default mongoose.model("Timer", TimerSchema);
