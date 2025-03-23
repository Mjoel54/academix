import { Router } from "express";
import courseRoutes from "./courseRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/courses", courseRoutes);
router.use("/users", userRoutes);

export default router;
