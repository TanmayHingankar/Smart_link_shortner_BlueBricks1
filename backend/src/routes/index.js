import { Router } from "express";
import authRoutes from "./auth.routes.js";
import linkRoutes from "./link.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import redirectRoutes from "./redirect.routes.js";
const router = Router();

router.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

router.use("/auth", authRoutes);
router.use("/links", linkRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/redirect", redirectRoutes);
export default router;



