import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";
import Link from "../models/link.model.js";
import { ClickEvent } from "../models/clickEvent.model.js";

const parseRange = (range) => {
  const r = String(range || "").toLowerCase();
  if (!r || r === "all") return null;
  const map = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
  };
  if (!map[r]) throw new ApiError(422, "Invalid range. Use 7d, 30d, 90d or all");
  return map[r];
};

export const getLinkAnalytics = async ({ ownerId, linkId, range }) => {
  if (!mongoose.Types.ObjectId.isValid(linkId)) {
    throw new ApiError(422, "Invalid link id");
  }


  const link = await Link.findOne({ _id: linkId, ownerId }).select("_id");
  if (!link) throw new ApiError(404, "Link not found");

  const days = parseRange(range);
  const startDate = days ? new Date(Date.now() - days * 24 * 60 * 60 * 1000) : null;


  const match = {
    linkId: new mongoose.Types.ObjectId(linkId),
  };
  if (startDate) {
    match.timestamp = { $gte: startDate };
  }

  const clicksOverTimePipeline = [
    { $match: match },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$timestamp",
          },
        },
        clicks: { $sum: 1 },
      },
    },
    { $sort: { "_id": 1 } },
    {
      $project: {
        _id: 0,
        date: "$_id",
        clicks: 1,
      },
    },
  ];

  const totalClicksPipeline = [
    { $match: match },
    { $group: { _id: null, totalClicks: { $sum: 1 } } },
    { $project: { _id: 0, totalClicks: 1 } },
  ];

  const topReferrersPipeline = [
    { $match: match },
    {
      $group: {
        _id: "$referrer",
        clicks: { $sum: 1 },
      },
    },
    { $sort: { clicks: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, referrer: "$_id", clicks: 1 } },
  ];

  const browserBreakdownPipeline = [
    { $match: match },
    {
      $group: {
       
        _id: { $ifNull: ["$browser", "Unknown"] },
        clicks: { $sum: 1 },
      },
    },
    { $sort: { clicks: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, browser: "$_id", clicks: 1 } },
  ];

  const deviceBreakdownPipeline = [
    { $match: match },
    {
      $group: {
        _id: { $ifNull: ["$device", "Unknown"] },
        clicks: { $sum: 1 },
      },
    },
    { $sort: { clicks: -1 } },
    { $project: { _id: 0, device: "$_id", clicks: 1 } },
  ];

  const latestClicksPipeline = [
    { $match: match },
    { $sort: { timestamp: -1 } },
    { $limit: 20 },
    {
      $project: {
        _id: 0,
        timestamp: 1,
        referrer: 1,
        userAgent: 1,
        country: 1,
        ipHash: 1,
      },
    },
  ];

  const [
    totalAgg,
    overTimeAgg,
    referrersAgg,
    browserAgg,
    deviceAgg,
    latestAgg,
  ] = await Promise.all([
    ClickEvent.aggregate(totalClicksPipeline),
    ClickEvent.aggregate(clicksOverTimePipeline),
    ClickEvent.aggregate(topReferrersPipeline),
    ClickEvent.aggregate(browserBreakdownPipeline),
    ClickEvent.aggregate(deviceBreakdownPipeline),
    ClickEvent.aggregate(latestClicksPipeline),
  ]);

  return {
    totalClicks: totalAgg?.[0]?.totalClicks || 0,
    clicksOverTime: overTimeAgg,
    topReferrers: referrersAgg,
    browserBreakdown: browserAgg,
    deviceBreakdown: deviceAgg,
    latestClicks: latestAgg,
  };
};

