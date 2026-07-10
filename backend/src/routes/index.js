import { Router } from "express";
import authRoutes from "./auth.routes.js";
import linkRoutes from "./link.routes.js";
const router = Router();

router.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

router.use("/auth", authRoutes);
router.use("/links", linkRoutes);
export default router;
