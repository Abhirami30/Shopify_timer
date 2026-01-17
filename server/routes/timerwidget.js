import express from "express";
import Timer from "../models/Timer.js";

const router = express.Router();

/**
 * Storefront API
 * Returns active timer for a product
 */
router.get("/active", async (req, res) => {
  const { shop, productId } = req.query;
  const now = new Date();

  if (!shop || !productId) {
    return res.status(400).json({ active: false });
  }

  // Find the most recent matching timer
  const timer = await Timer.findOne({
    shop,
    productId,
    $or: [
      {
        type: "FIXED",
        startAt: { $lte: now },
        endAt: { $gte: now },
      },
      {
        type: "EVERGREEN",
      },
    ],
  }).sort({ createdAt: -1 });

  if (!timer) {
    return res.json({ active: false });
  }

  // Increment impression once per page load
  timer.impressions += 1;
  await timer.save();

  return res.json({
    active: true,
    timer: {
      id: timer._id,
      type: timer.type,
      endAt: timer.endAt,
      durationSeconds: timer.durationSeconds,
      headline: timer.headline,
      subtext: timer.subtext,
    },
  });
});

export default router;
