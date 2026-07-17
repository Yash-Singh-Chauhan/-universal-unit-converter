import { Router } from "express";
import currencyRoutes from "./currencyRoutes.js";

const router = Router();

router.use("/currency", currencyRoutes);

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;
