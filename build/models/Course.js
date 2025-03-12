"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true, maxlength: 50 },
    assignments: { type: [String], required: false },
    students: { type: [String], required: false },
    teachers: { type: [String], required: false },
});
// To use the schema definition, we need to convert roomSchema into a Model we can work with.
const Course = (0, mongoose_1.model)("Course", roomSchema);
exports.default = Course;
