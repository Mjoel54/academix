"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../../controllers/courseController");
const router = (0, express_1.Router)();
router.route("/").get(courseController_1.getAllCourses);
// router.route("/:id").get();
exports.default = router;
