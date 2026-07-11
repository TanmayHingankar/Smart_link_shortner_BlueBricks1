import { Router } from "express";
import protect from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { linkCreationLimiter } from "../middlewares/linkRateLimiter.js";
import { createLinkSchema } from "../validations/link.validation.js";
import {
  create,
  list,
} from "../controllers/link.controller.js";
const router = Router();
router.get("/", protect, list);
router.post("/", protect, linkCreationLimiter, validate(createLinkSchema), create);

export default router;