import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addCourseEnrolment,
  updateCourseEnrolment,
  removeCourseEnrolment,
} from "../../controllers/userController";

const router = Router();

// Base user routes
router.route("/").get(getAllUsers);

// User by ID routes
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// User enrolment routes
router
  .route("/:id/enrolments")
  .post(addCourseEnrolment)
  .put(updateCourseEnrolment)
  .delete(removeCourseEnrolment);

export default router;
