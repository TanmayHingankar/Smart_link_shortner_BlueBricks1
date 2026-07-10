import { nanoid } from "nanoid";
import Link from "../models/link.model.js";
import ApiError from "../utils/apiError.js";

const MAX_RETRY = 5;

export const createShortCode = async (customAlias) => {

  if (customAlias) {

    const exists = await Link.findOne({
      customAlias,
    });

    if (exists) {
      throw new ApiError(409, "Alias already exists");
    }

    return customAlias;
  }

  for (let i = 0; i < MAX_RETRY; i++) {

    const code = nanoid(7);

    const exists = await Link.exists({
      shortCode: code,
    });

    if (!exists) return code;
  }

  throw new ApiError(
    500,
    "Unable to generate unique short code"
  );
};

export const createLink = async ({
  ownerId,
  longUrl,
  customAlias,
  expiresAt,
}) => {

  const shortCode =
    await createShortCode(customAlias);

  const link = await Link.create({

    ownerId,

    longUrl,

    shortCode,

    customAlias,

    expiresAt,

  });

  return link;
};

export const getUserLinks = async (ownerId) => {
  return await Link.find({ ownerId }).sort({ createdAt: -1 });
};