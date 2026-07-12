import asyncHandler from "../utils/asyncHandler.js";
import {
  createLink,
  getUserLinks,
  getUserLinkStats,
} from "../services/link.service.js";

export const create = asyncHandler(async (req, res) => {
  const link = await createLink({
    ownerId: req.user.id,
    longUrl: req.body.longUrl,
    customAlias: req.body.customAlias,
    expiresAt: req.body.expiresAt,
  });

  res.status(201).json({
    success: true,
    message: "Short link created successfully",
    data: link,
  });
});

export const list = asyncHandler(async (req, res) => {
  const links = await getUserLinks(req.user.id);

  res.json({
    success: true,
    data: links,
  });
});

export const stats = asyncHandler(async (req, res) => {
  const data = await getUserLinkStats(req.user.id);

  res.json({
    success: true,
    data,
  });
});