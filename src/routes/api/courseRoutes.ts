import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addStudentToCourse,
  addAssignmentToCourse,
} from "../../controllers/courseController";

const router = Router();

// Base course routes
router.route("/").get(getAllCourses).post(createCourse);

// Course by ID routes
router.route("/:id").get(getCourseById).put(updateCourse).delete(deleteCourse);

// Course utility routes
router.route("/:id/students").post(addStudentToCourse);

router.route("/:id/assignments").post(addAssignmentToCourse);

export default router;
