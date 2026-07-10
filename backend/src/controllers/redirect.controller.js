import asyncHandler from "../utils/asyncHandler.js";
import { findLinkByCode, recordClick } from "../services/redirect.service.js";

export const redirect = asyncHandler(async (req, res) => {
  const code = req.params.code;
  const link = await findLinkByCode(code);

  // Fire-and-forget click logging; redirect must remain fast.
  recordClick({ req, link }).catch(() => undefined);

  return res.redirect(302, link.longUrl);
});
