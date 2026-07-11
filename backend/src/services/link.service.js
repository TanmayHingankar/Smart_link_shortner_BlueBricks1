import { nanoid } from "nanoid";
import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js";
import hotLinkCache from "../cache/hotLink.cache.js";

const MAX_RETRY = 7;

const normalizeAlias = (value) => {
  if (value === undefined || value === null) return undefined;
  const v = String(value).trim();
  if (!v) return undefined;
  return v;
};

const parseExpiry = (value) => {
  if (value === undefined || value === null || value === "") return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    throw new ApiError(422, "Invalid expiresAt value");
  }
  return d;
};

export const createShortCode = async (customAlias) => {
  const alias = normalizeAlias(customAlias);


  if (alias) {
    const exists = await Link.findOne({ customAlias: alias }).select("_id");
    if (exists) throw new ApiError(409, "Alias already exists");
    return alias;
  }

  for (let i = 0; i < MAX_RETRY; i++) {
    const code = nanoid(7);
    const exists = await Link.exists({ shortCode: code });
    if (!exists) return code;
  }

  throw new ApiError(500, "Unable to generate unique short code");
};

export const createLink = async ({ ownerId, longUrl, customAlias, expiresAt }) => {
  const shortCode = await createShortCode(customAlias);
  const expiryDate = expiresAt ? parseExpiry(expiresAt) : undefined;

  const normalizedAlias = normalizeAlias(customAlias);
  try {
    const link = await Link.create({
      ownerId,
      longUrl,
      shortCode,
      customAlias: normalizedAlias,
      expiresAt: expiryDate ?? null,
    });

    hotLinkCache.set(link.shortCode, link);
    return link;
  } catch (err) {
    
    if (err && err.code === 11000) {
    
      if (normalizedAlias) throw new ApiError(409, "Alias already exists");

      for (let i = 0; i < MAX_RETRY; i++) {
        const code = nanoid(7);
        const exists = await Link.exists({ shortCode: code });
        if (exists) continue;

        try {
          const link = await Link.create({
            ownerId,
            longUrl,
            shortCode: code,
            customAlias: undefined,
            expiresAt: expiryDate ?? null,
          });
          hotLinkCache.set(link.shortCode, link);
          return link;
        } catch (e) {
          if (e && e.code === 11000) continue;
          throw e;
        }
      }

      throw new ApiError(500, "Unable to generate unique short code");
    }

    throw err;
  }
};

export const getUserLinks = async (ownerId) => {
  return await Link.find({ ownerId }).sort({ createdAt: -1 });
};

