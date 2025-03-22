import mongoose from "mongoose";
import Course from "../models/Course";
import connectToMongoDb from "../db/connection";
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
    description:
      "Advanced mathematical concepts including calculus and linear algebra.",
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
    description:
      "Survey of art history from the Renaissance period to modern times.",
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

const seed = async () => {
  try {
    const conn = await connectToMongoDb();

    // Clear existing courses
    await Course.deleteMany({});

    // Insert new courses
    const seedCourses = await Course.insertMany(courseSeeds);

    console.log("Database seeded successfully 🌱");
    console.log(`${seedCourses.length} courses created`);

    return { success: true, count: seedCourses.length };
  } catch (error) {
    console.error("Seeding error:", error);
    return { success: false, error };
  } finally {
    // Disconnect from database
    await mongoose.disconnect();
  }
};

// Only run if this file is run directly
if (require.main === module) {
  seed().then(() => process.exit());
}

export default seed;
