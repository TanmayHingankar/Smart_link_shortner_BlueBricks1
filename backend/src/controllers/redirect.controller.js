import asyncHandler from "../utils/asyncHandler.js";
import { monitorRedirectBurst } from "../middlewares/redirectBurstMonitor.js";
import { findLinkByCode, recordClick } from "../services/redirect.service.js";

export const redirect = asyncHandler(async (req, res) => {
  const code = req.params.code;

  monitorRedirectBurst(req, code);

  const link = await findLinkByCode(code);

  recordClick({ req, link }).catch(() => undefined);

  return res.redirect(302, link.longUrl);
});
