import SHA256 from "crypto-js/sha256.js";

export const hashIP = (ip) => {
  return SHA256(ip).toString();
};

export default hashIP;