"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../../controllers/courseController");
const router = (0, express_1.Router)();
// Base course routes
router.route("/").get(courseController_1.getAllCourses).post(courseController_1.createCourse);
// Course by ID routes
router.route("/:id").get(courseController_1.getCourseById).put(courseController_1.updateCourse).delete(courseController_1.deleteCourse);
// Course utility routes
router.route("/:id/students").post(courseController_1.addStudentToCourse);
router.route("/:id/assignments").post(courseController_1.addAssignmentToCourse);
exports.default = router;
