import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addStudentToCourse,
} from "../../controllers/courseController";

import {
  getCourseAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "../../controllers/assignmentController";

const router = Router();

// Base course routes
router.route("/").get(getAllCourses).post(createCourse);

// Course by ID routes
router.route("/:id").get(getCourseById).put(updateCourse).delete(deleteCourse);

// Course utility routes
router.route("/:id/students").post(addStudentToCourse);

// Assignment routes
router
  .route("/:courseId/assignments")
  .get(getCourseAssignments)
  .post(createAssignment);

router
  .route("/:courseId/assignments/:assignmentId")
  .get(getAssignmentById)
  .put(updateAssignment)
  .delete(deleteAssignment);

export default router;
