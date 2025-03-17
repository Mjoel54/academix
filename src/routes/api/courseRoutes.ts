import { Router } from "express";
import {
  getAllCourses,
  createCourse,
} from "../../controllers/courseController";

const router = Router();

router.route("/").get(getAllCourses).post(createCourse);

// router.route("/:id").get();

export default router;
