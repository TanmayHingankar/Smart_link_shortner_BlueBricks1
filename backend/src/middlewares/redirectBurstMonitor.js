import config from "../config/index.js";

const hits = new Map();

export const monitorRedirectBurst = (req, code) => {
  const key = `ip:${req.ip || "unknown"}`;
  const now = Date.now();
  const windowMs = config.rateLimit.burstWindowMs;

  const valid = (hits.get(key) || []).filter((time) => now - time < windowMs);
  valid.push(now);
  hits.set(key, valid);

  if (valid.length > config.rateLimit.burstThreshold) {
    console.warn(
      `[suspicious-burst] ip=${req.ip} code=${code} hits=${valid.length} ` +
        `window=${windowMs}ms`
    );
  }
};

export default monitorRedirectBurst;
