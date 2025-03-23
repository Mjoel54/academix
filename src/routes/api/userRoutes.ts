import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addCourseEnrollment,
  updateCourseEnrollment,
} from "../../controllers/userController";

const router = Router();

// Base user routes
router.route("/").get(getAllUsers).post(createUser);

// User by ID routes
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// User enrollment routes
router
  .route("/:id/enrollments")
  .post(addCourseEnrollment)
  .put(updateCourseEnrollment);

export default router;
