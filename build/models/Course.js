"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },
    sisId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
    },
    term: {
        type: String,
        required: true,
        enum: ["Fall", "Spring", "Summer", "Winter"],
    },
    accessFrom: {
        type: Date,
        required: true,
    },
    accessUntil: {
        type: Date,
        required: true,
    },
    assignments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Assignment",
        },
    ],
    modules: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Module",
        },
    ],
    students: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    teachers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    teachingAssistants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    isPublished: {
        type: Boolean,
        default: false,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Indexes for better query performance
courseSchema.index({ courseCode: 1 }, { unique: true });
courseSchema.index({ sisId: 1 }, { unique: true });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ isArchived: 1 });
const Course = (0, mongoose_1.model)("Course", courseSchema);
exports.default = Course;
