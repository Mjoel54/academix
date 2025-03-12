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
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../db/connection");
require("dotenv").config();
const courseSeeds = [
    {
        title: "Introduction to Programming",
        assignments: ["Variables & Data Types", "Control Structures"],
        students: ["Alice", "Bob", "Charlie"],
        teachers: ["Prof. Smith"],
    },
    {
        title: "Advanced Mathematics",
        assignments: ["Calculus Homework", "Linear Algebra Project"],
        students: ["David", "Eva", "Frank"],
        teachers: ["Prof. Johnson"],
    },
    {
        title: "History of Art",
        assignments: ["Renaissance Essay", "Modern Art Presentation"],
        students: ["Grace", "Hank", "Isabella"],
        teachers: ["Prof. Brown"],
    },
];
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.db.createCollection("courses");
        const seedCourses = yield connection_1.db.collection("courses").insertMany(courseSeeds);
        console.log("Database seeded 🌱");
        return { seedMsg: seedCourses };
    }
    catch (x) {
        console.error(x);
        return { error: x };
    }
});
seed();
