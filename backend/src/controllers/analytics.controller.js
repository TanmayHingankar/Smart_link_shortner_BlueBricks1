import asyncHandler from "../utils/asyncHandler.js";
import { getLinkAnalytics } from "../services/analytics.service.js";

export const linkAnalytics = asyncHandler(async (req, res) => {
  const range = req.query.range;
  const ownerId = req.user.id;
  const linkId = req.params.id;

  const data = await getLinkAnalytics({ ownerId, linkId, range });

  res.json({
    success: true,
    data,
  });
});

