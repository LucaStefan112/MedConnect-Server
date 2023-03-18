const RateLimit = require("express-rate-limit");
export const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
});
