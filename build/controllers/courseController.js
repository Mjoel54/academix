"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = exports.getAllCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
// GET all courses;
const getAllCourses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.find();
        res.json({ docs: courses });
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.json({ error });
    }
});
exports.getAllCourses = getAllCourses;
// POST a new course;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, assignments, students, teachers } = req.body;
        // Validate required fields
        if (!title) {
            res.status(400).json({ error: "Course title is required" });
            return;
        }
        // Create a new course document
        const newCourse = new Course_1.default({
            title: title,
            assignments: assignments || [],
            students: students || [],
            teachers: teachers || [],
        });
        // Save the course to the database
        const savedCourse = yield newCourse.save();
        // Send success response
        res.status(201).json({
            message: "Course created successfully",
            course: savedCourse,
        });
    }
    catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Failed to create course" });
    }
});
exports.createCourse = createCourse;
