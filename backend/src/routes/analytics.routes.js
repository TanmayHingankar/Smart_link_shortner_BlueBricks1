import { Router } from "express";
import protect from "../middlewares/auth.js";
import { linkAnalytics } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/links/:id/analytics", protect, linkAnalytics);

export default router;

