import config from "../config/index.js";
import { createRateLimiter } from "./rateLimiter.js";

export const linkCreationLimiter = createRateLimiter({
  windowMs: config.rateLimit.createWindowMs,
  maxRequests: config.rateLimit.createMax,
});

export default linkCreationLimiter;
