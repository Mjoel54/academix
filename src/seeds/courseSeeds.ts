import { Types } from "mongoose";
import { IAssignmentSeed } from "./assignmentSeeds";
import { ITerm } from "../models/Term";

export interface ICourseSeed {
  title: string;
  courseCode: string;
  sisId: string;
  description: string;
  term: Types.ObjectId | ITerm;
  accessFrom: Date;
  accessUntil: Date;
  assignments: IAssignmentSeed[];
  modules: Types.ObjectId[];
  students: Types.ObjectId[];
  teachers: Types.ObjectId[];
  teachingAssistants: Types.ObjectId[];
  isPublished: boolean;
  isArchived: boolean;
}

// Note: The actual term IDs will need to be set when seeding the database
// This is just a placeholder structure
export const courseSeeds: ICourseSeed[] = [
  {
    title: "Introduction to Programming",
    courseCode: "CS101",
    sisId: "CS101-2024-SPRING",
    description: "Learn the fundamentals of programming using JavaScript",
    term: new Types.ObjectId(), // This will be replaced with actual term ID during seeding
    accessFrom: new Date("2024-01-15"),
    accessUntil: new Date("2024-05-15"),
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
    sisId: "MATH301-2024-SPRING",
    description:
      "Advanced topics in mathematics including calculus and linear algebra",
    term: new Types.ObjectId(), // This will be replaced with actual term ID during seeding
    accessFrom: new Date("2024-01-15"),
    accessUntil: new Date("2024-05-15"),
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
    courseCode: "ART201",
    sisId: "ART201-2024-SPRING",
    description: "Survey of art history from the Renaissance to modern times",
    term: new Types.ObjectId(), // This will be replaced with actual term ID during seeding
    accessFrom: new Date("2024-01-15"),
    accessUntil: new Date("2024-05-15"),
    assignments: [],
    modules: [],
    students: [],
    teachers: [],
    teachingAssistants: [],
    isPublished: true,
    isArchived: false,
  },
];
