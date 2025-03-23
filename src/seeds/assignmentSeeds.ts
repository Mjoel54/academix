import { Types } from "mongoose";

export interface IAssignmentSeed {
  title: string;
  description: string;
  dueDate: Date;
  totalPoints: number;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Create assignments for CS101
const cs101Assignments: IAssignmentSeed[] = [
  {
    title: "JavaScript Basics Quiz",
    description:
      "Test your understanding of JavaScript fundamentals including variables, data types, and operators.",
    dueDate: addDays(new Date("2024-01-30"), 14),
    totalPoints: 100,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Functions and Control Flow Assignment",
    description:
      "Implement various functions demonstrating your understanding of control flow statements and function declarations.",
    dueDate: addDays(new Date("2024-02-15"), 14),
    totalPoints: 150,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Arrays and Objects Project",
    description:
      "Create a small program that demonstrates your understanding of arrays, objects, and array methods.",
    dueDate: addDays(new Date("2024-03-01"), 21),
    totalPoints: 200,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Create assignments for MATH301
const math301Assignments: IAssignmentSeed[] = [
  {
    title: "Calculus I Problem Set",
    description:
      "Solve problems related to limits, derivatives, and basic integration techniques.",
    dueDate: addDays(new Date("2024-01-25"), 10),
    totalPoints: 100,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Linear Algebra Quiz",
    description:
      "Test covering matrices, determinants, and linear transformations.",
    dueDate: addDays(new Date("2024-02-10"), 14),
    totalPoints: 150,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Advanced Integration Methods",
    description:
      "Comprehensive assignment on advanced integration techniques including partial fractions and trigonometric substitution.",
    dueDate: addDays(new Date("2024-03-15"), 14),
    totalPoints: 200,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Create assignments for ART201
const art201Assignments: IAssignmentSeed[] = [
  {
    title: "Renaissance Art Analysis",
    description:
      "Write a detailed analysis of a Renaissance masterpiece of your choice.",
    dueDate: addDays(new Date("2024-01-20"), 21),
    totalPoints: 100,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Baroque Period Research Paper",
    description:
      "Research paper on the characteristics and significance of Baroque art.",
    dueDate: addDays(new Date("2024-02-20"), 21),
    totalPoints: 150,
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Modern Art Movement Presentation",
    description:
      "Prepare and present a comprehensive overview of a chosen modern art movement.",
    dueDate: addDays(new Date("2024-03-20"), 14),
    totalPoints: 200,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Export assignments grouped by course code
export const assignmentSeeds = {
  CS101: cs101Assignments,
  MATH301: math301Assignments,
  ART201: art201Assignments,
};
