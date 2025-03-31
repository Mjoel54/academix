import { Router } from "express";
import courseRoutes from "./courseRoutes";
import userRoutes from "./userRoutes";
import termRoutes from "./termRoutes";

const router = Router();

router.use("/courses", courseRoutes);
router.use("/users", userRoutes);
router.use("/terms", termRoutes);

export default router;
