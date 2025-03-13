import { Router } from "express";
import apiRoutes from "./api/index";

const router = Router();

router.use("/", apiRoutes);

router.use((_req, res) => {
  return res.send("404 Not Found");
});

export default router;
