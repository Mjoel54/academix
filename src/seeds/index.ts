import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Course from "../models/Course";
import { userSeeds } from "./userSeeds";
import { courseSeeds } from "./courseSeeds";
import { assignmentSeeds } from "./assignmentSeeds";
import type { IUser } from "../models/User";
import type { ICourse } from "../models/Course";
import type { IAssignmentSeed } from "./assignmentSeeds";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/academix";
    await mongoose.connect(MONGODB_URI);
    console.log("📦 Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Insert users first
    const users = await User.create(userSeeds);
    console.log(`👥 Created ${users.length} users`);

    // Get user IDs for relationships
    const teacher = users.find(
      (user) => !user.isAdmin && user.name.includes("John")
    ) as IUser;
    const student = users.find(
      (user) => !user.isAdmin && user.name.includes("Sarah")
    ) as IUser;

    // Prepare courses with user relationships and assignments
    const preparedCourses = courseSeeds.map((course) => {
      // Extract the assignment lookup key from sisId (e.g., "CS101-2024-SPRING" => "CS101")
      const assignmentLookupKey = course.sisId.split("-")[0];

      return {
        ...course,
        teachers: teacher ? [teacher._id] : [],
        students: student ? [student._id] : [],
        assignments:
          assignmentSeeds[
            assignmentLookupKey as keyof typeof assignmentSeeds
          ] || [],
      };
    });

    // Insert courses
    const courses = await Course.create(preparedCourses);
    console.log(`📚 Created ${courses.length} courses with assignments`);

    // Update teacher enrolments using the model method
    if (teacher) {
      for (const course of courses) {
        await teacher.addEnrolment(course._id, "teacher");
      }
      console.log("👨‍🏫 Updated teacher enrolments");
    }

    // Update student enrolments (enrol in first two courses)
    if (student) {
      for (const course of courses.slice(0, 2)) {
        await student.addEnrolment(course._id, "student");
      }
      console.log("👩‍🎓 Updated student enrolments");
    }

    console.log("✅ Database seeded successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
