import { Router } from "express";
import { getAllCourses } from "../../controllers/courseController";

const router = Router();

router.route("/").get(getAllCourses);

// router.route("/:id").get();

export default router;
