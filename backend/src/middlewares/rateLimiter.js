import ApiError from "../utils/apiError.js";

export const createRateLimiter = ({ windowMs, maxRequests, keyGenerator }) => {
  const requests = new Map();
  const resolveKey =
    keyGenerator || ((req) => req.user?._id?.toString() ?? `ip:${req.ip}`);

  return (req, res, next) => {
    const key = resolveKey(req);
    const now = Date.now();

    const timestamps = requests.get(key) || [];
    const validTimestamps = timestamps.filter((time) => now - time < windowMs);

    res.set("X-RateLimit-Limit", String(maxRequests));

    if (validTimestamps.length >= maxRequests) {
      const oldestRequest = validTimestamps[0];
      const retryAfter = Math.ceil((windowMs - (now - oldestRequest)) / 1000);

      res.set("X-RateLimit-Remaining", "0");
      res.set("Retry-After", String(retryAfter));

      return next(
        new ApiError(
          429,
          `Rate limit exceeded. Try again in ${retryAfter} seconds.`
        )
      );
    }

    validTimestamps.push(now);

    if (validTimestamps.length === 0) requests.delete(key);
    else requests.set(key, validTimestamps);

    res.set(
      "X-RateLimit-Remaining",
      String(maxRequests - validTimestamps.length)
    );

    next();
  };
};

export default createRateLimiter;
