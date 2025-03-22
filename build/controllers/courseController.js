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
exports.addAssignmentToCourse = exports.addStudentToCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getAllCourses = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const mongoose_1 = __importDefault(require("mongoose"));
// GET all courses (with filtering for archived)
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { term, published } = req.query;
        const filter = { isArchived: false };
        if (term)
            filter.term = term;
        if (published !== undefined)
            filter.isPublished = published === "true";
        const courses = yield Course_1.default.find(filter)
            .populate("teachers", "name email")
            .populate("teachingAssistants", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to fetch courses",
        });
    }
});
exports.getAllCourses = getAllCourses;
// GET single course by ID
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.default.findById(req.params.id)
            .populate("teachers", "name email")
            .populate("teachingAssistants", "name email")
            .populate("students", "name email")
            .populate("assignments")
            .populate("modules");
        if (!course) {
            res.status(404).json({
                success: false,
                error: "Course not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: course,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.CastError) {
            res.status(400).json({
                success: false,
                error: "Invalid course ID",
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: "Failed to fetch course",
        });
    }
});
exports.getCourseById = getCourseById;
// POST create new course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, courseCode, sisId, description, term, accessFrom, accessUntil, teachers, } = req.body;
        // Validate required fields
        if (!title || !courseCode || !sisId || !description || !term || !teachers) {
            res.status(400).json({
                success: false,
                error: "Please provide all required fields",
            });
            return;
        }
        const course = yield Course_1.default.create(Object.assign(Object.assign({}, req.body), { isPublished: false, isArchived: false }));
        res.status(201).json({
            success: true,
            data: course,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
            return;
        }
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                error: "Course code or SIS ID already exists",
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: "Failed to create course",
        });
    }
});
exports.createCourse = createCourse;
// PUT update course
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.default.findById(req.params.id);
        if (!course) {
            res.status(404).json({
                success: false,
                error: "Course not found",
            });
            return;
        }
        // Prevent updating unique fields if they already exist
        if (req.body.courseCode || req.body.sisId) {
            const existingCourse = yield Course_1.default.findOne({
                $or: [{ courseCode: req.body.courseCode }, { sisId: req.body.sisId }],
                _id: { $ne: req.params.id },
            });
            if (existingCourse) {
                res.status(400).json({
                    success: false,
                    error: "Course code or SIS ID already exists",
                });
                return;
            }
        }
        const updatedCourse = yield Course_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({
            success: true,
            data: updatedCourse,
        });
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: "Failed to update course",
        });
    }
});
exports.updateCourse = updateCourse;
// DELETE course (soft delete by archiving)
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_1.default.findById(req.params.id);
        if (!course) {
            res.status(404).json({
                success: false,
                error: "Course not found",
            });
            return;
        }
        // Soft delete by archiving
        course.isArchived = true;
        yield course.save();
        res.status(200).json({
            success: true,
            message: "Course archived successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to archive course",
        });
    }
});
exports.deleteCourse = deleteCourse;
// POST add student to course
const addStudentToCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.body;
        const courseId = req.params.id;
        if (!studentId) {
            res.status(400).json({
                success: false,
                error: "Please provide student ID",
            });
            return;
        }
        const course = yield Course_1.default.findById(courseId);
        if (!course) {
            res.status(404).json({
                success: false,
                error: "Course not found",
            });
            return;
        }
        // Check if student is already enrolled
        if (course.students.includes(studentId)) {
            res.status(400).json({
                success: false,
                error: "Student is already enrolled in this course",
            });
            return;
        }
        course.students.push(studentId);
        yield course.save();
        res.status(200).json({
            success: true,
            message: "Student added to course successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to add student to course",
        });
    }
});
exports.addStudentToCourse = addStudentToCourse;
// POST add assignment to course
const addAssignmentToCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { assignmentId } = req.body;
        const courseId = req.params.id;
        if (!assignmentId) {
            res.status(400).json({
                success: false,
                error: "Please provide assignment ID",
            });
            return;
        }
        const course = yield Course_1.default.findById(courseId);
        if (!course) {
            res.status(404).json({
                success: false,
                error: "Course not found",
            });
            return;
        }
        // Check if assignment is already added
        if (course.assignments.includes(assignmentId)) {
            res.status(400).json({
                success: false,
                error: "Assignment is already added to this course",
            });
            return;
        }
        course.assignments.push(assignmentId);
        yield course.save();
        res.status(200).json({
            success: true,
            message: "Assignment added to course successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: "Failed to add assignment to course",
        });
    }
});
exports.addAssignmentToCourse = addAssignmentToCourse;
