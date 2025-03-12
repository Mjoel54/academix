import { Router } from "express";
import courseRoutes from "./courseRoutes";

const router = Router();

router.use("/courses", courseRoutes);

export default router;
