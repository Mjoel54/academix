import { Types } from "mongoose";

export interface IUserSeed {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin";
  enrollments: Array<{
    courseId: Types.ObjectId;
    role: "student" | "teacher" | "teachingAssistant";
    status: "active" | "inactive" | "completed";
  }>;
  isActive: boolean;
  lastLogin?: Date;
}

export const userSeeds: IUserSeed[] = [
  {
    name: "John Smith",
    email: "john.smith@academix.edu",
    password: "hashedPassword123", // Note: In production, this would be properly hashed
    role: "teacher",
    enrollments: [],
    isActive: true,
    lastLogin: new Date("2024-01-15"),
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@academix.edu",
    password: "hashedPassword456",
    role: "student",
    enrollments: [],
    isActive: true,
    lastLogin: new Date("2024-01-20"),
  },
  {
    name: "Admin User",
    email: "admin@academix.edu",
    password: "hashedPassword789",
    role: "admin",
    enrollments: [],
    isActive: true,
    lastLogin: new Date("2024-01-22"),
  },
];
