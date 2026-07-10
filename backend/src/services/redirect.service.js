import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js";
import { ClickEvent } from "../models/clickEvent.model.js";
import { hashIP } from "../utils/hash.js";

const safeString = (v, fallback = "") => {
  if (v === undefined || v === null) return fallback;
  return String(v);
};

const getClientIP = (req) => {
  // X-Forwarded-For: first value is the original client.
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    return xff.split(",")[0].trim();
  }
  const rip = req.socket?.remoteAddress;
  return typeof rip === "string" ? rip : "";
};

export const findLinkByCode = async (code) => {
  const link = await Link.findOne({ shortCode: code });

  if (!link) {
    throw new ApiError(404, "Short link not found");
  }

  // Inactive link
  if (!link.isActive) {
    throw new ApiError(410, "This link has been deactivated");
  }

  // Expired link
  if (link.expiresAt && link.expiresAt < new Date()) {
    throw new ApiError(410, "This link has expired");
  }

  return link;
};

export const recordClick = async ({ req, link }) => {
  // Fire-and-forget: caller should not await this.
  try {
    const ip = getClientIP(req);
    const ipHash = hashIP(ip || "");

    const referrer = safeString(req.get("referer") || "Direct", "Direct");
    const userAgent = safeString(req.get("user-agent") || "", "");

    // Country detection is not implemented. Keep default.
    const country = "Unknown";

    return ClickEvent.create({
      linkId: link._id,
      timestamp: new Date(),
      referrer,
      userAgent,
      ipHash,
      country,
    });
  } catch {
    // Never block redirect flow.
    return undefined;
  }
};

