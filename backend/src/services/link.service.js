import { nanoid } from "nanoid";
import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js";

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

  // Custom alias support
  if (alias) {
    const exists = await Link.findOne({ customAlias: alias }).select("_id");
    if (exists) throw new ApiError(409, "Alias already exists");
    return alias;
  }

  // NanoID short code generation + collision retry
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

    return link;
  } catch (err) {
    // Handle potential duplicate key races (shortCode/customAlias)
    // Mongo/Mongoose duplicate key error code is 11000
    if (err && err.code === 11000) {
      // If alias was used, treat it as conflict
      if (normalizedAlias) throw new ApiError(409, "Alias already exists");

      // Otherwise retry short code generation
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

