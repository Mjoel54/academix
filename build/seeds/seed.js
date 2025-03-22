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
const mongoose_1 = __importDefault(require("mongoose"));
const Course_1 = __importDefault(require("../models/Course"));
const connection_1 = __importDefault(require("../db/connection"));
require("dotenv").config();
const courseSeeds = [
    {
        title: "Introduction to Programming",
        courseCode: "CS101",
        sisId: "CS101-F23",
        description: "An introductory course to programming concepts using Python.",
        term: "Fall",
        accessFrom: new Date("2023-09-01"),
        accessUntil: new Date("2023-12-20"),
        assignments: [],
        modules: [],
        students: [],
        teachers: [],
        teachingAssistants: [],
        isPublished: true,
        isArchived: false,
    },
    {
        title: "Advanced Mathematics",
        courseCode: "MATH301",
        sisId: "MATH301-F23",
        description: "Advanced mathematical concepts including calculus and linear algebra.",
        term: "Fall",
        accessFrom: new Date("2023-09-01"),
        accessUntil: new Date("2023-12-20"),
        assignments: [],
        modules: [],
        students: [],
        teachers: [],
        teachingAssistants: [],
        isPublished: true,
        isArchived: false,
    },
    {
        title: "Art History: Renaissance to Modern",
        courseCode: "ART202",
        sisId: "ART202-F23",
        description: "Survey of art history from the Renaissance period to modern times.",
        term: "Fall",
        accessFrom: new Date("2023-09-01"),
        accessUntil: new Date("2023-12-20"),
        assignments: [],
        modules: [],
        students: [],
        teachers: [],
        teachingAssistants: [],
        isPublished: true,
        isArchived: false,
    },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, connection_1.default)();
        // Clear existing courses
        yield Course_1.default.deleteMany({});
        // Insert new courses
        const seedCourses = yield Course_1.default.insertMany(courseSeeds);
        console.log("Database seeded successfully 🌱");
        console.log(`${seedCourses.length} courses created`);
        return { success: true, count: seedCourses.length };
    }
    catch (error) {
        console.error("Seeding error:", error);
        return { success: false, error };
    }
    finally {
        // Disconnect from database
        yield mongoose_1.default.disconnect();
    }
});
// Only run if this file is run directly
if (require.main === module) {
    seed().then(() => process.exit());
}
exports.default = seed;
