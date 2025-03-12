import { db } from "../db/connection";
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

const seed = async () => {
  try {
    await db.createCollection("courses");

    const seedCourses = await db.collection("courses").insertMany(courseSeeds);

    console.log("Database seeded 🌱");
    return { seedMsg: seedCourses };
  } catch (x) {
    console.error(x);
    return { error: x };
  }
};

seed();
