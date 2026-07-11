import { UAParser } from "ua-parser-js";
import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js";
import { ClickEvent } from "../models/clickEvent.model.js";
import { hashIP } from "../utils/hash.js";
import hotLinkCache from "../cache/hotLink.cache.js";

export const invalidateLinkCache = (code) => hotLinkCache.delete(code);
const resolveDeviceType = (type) => {
  if (!type) return "Desktop";
  if (type === "mobile") return "Mobile";
  if (type === "tablet") return "Tablet";
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const parseUserAgent = (userAgent) => {
  if (!userAgent) return { browser: "Unknown", device: "Unknown" };
  const parsed = UAParser(userAgent);
  return {
    browser: parsed.browser?.name || "Unknown",
    device: resolveDeviceType(parsed.device?.type),
  };
};

const safeString = (v, fallback = "") => {
  if (v === undefined || v === null) return fallback;
  return String(v);
};

const getClientIP = (req) => {
 
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.trim()) {
    return xff.split(",")[0].trim();
  }
  const rip = req.socket?.remoteAddress;
  return typeof rip === "string" ? rip : "";
};

export const findLinkByCode = async (code) => {
  let link = hotLinkCache.get(code);
  if (!link) {
    link = await Link.findOne({ shortCode: code });
    if (link) hotLinkCache.set(code, link);
  }

  if (!link) {
    throw new ApiError(404, "Short link not found");
  }
  if (!link.isActive) {
    hotLinkCache.delete(code);
    throw new ApiError(410, "This link has been deactivated");
  }

  if (link.expiresAt && link.expiresAt < new Date()) {
    hotLinkCache.delete(code);
    throw new ApiError(410, "This link has expired");
  }

  return link;
};

export const recordClick = async ({ req, link }) => {

  try {
    const ip = getClientIP(req);
    const ipHash = hashIP(ip || "");

    const referrer = safeString(req.get("referer") || "Direct", "Direct");
    const userAgent = safeString(req.get("user-agent") || "", "");
    const { browser, device } = parseUserAgent(userAgent);

    const country = "Unknown";

    return ClickEvent.create({
      linkId: link._id,
      timestamp: new Date(),
      referrer,
      userAgent,
      browser,
      device,
      ipHash,
      country,
    });
  } catch {
    return undefined;
  }
};

