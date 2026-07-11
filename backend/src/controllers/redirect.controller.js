import asyncHandler from "../utils/asyncHandler.js";
import { findLinkByCode, recordClick } from "../services/redirect.service.js";

export const redirect = asyncHandler(async (req, res) => {
  const code = req.params.code;
  const link = await findLinkByCode(code);

  recordClick({ req, link }).catch(() => undefined);

  return res.redirect(302, link.longUrl);
});
