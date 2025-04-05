import { Router } from "express";
import apiRoutes from "./api/index";
import authRoutes from "./authRoutes/authRoutes";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/api", authenticateToken, apiRoutes);

router.use((_req, res) => {
  return res.send("404 Not Found");
});

export default router;
