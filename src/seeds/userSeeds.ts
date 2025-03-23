import { Types } from "mongoose";
import { CourseRole, IEnrolment } from "../models/Enrolments";

export interface IUserSeed {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  enrolments: IEnrolment[];
  avatar?: string;
  lastLogin?: Date;
}

export const userSeeds: IUserSeed[] = [
  {
    name: "John Smith",
    email: "john.smith@academix.edu",
    password: "hashedPassword123", // Note: In production, this would be properly hashed
    isAdmin: false,
    isActive: true,
    enrolments: [],
    lastLogin: new Date("2024-01-15"),
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@academix.edu",
    password: "hashedPassword456",
    isAdmin: false,
    isActive: true,
    enrolments: [],
    lastLogin: new Date("2024-01-20"),
  },
  {
    name: "Admin User",
    email: "admin@academix.edu",
    password: "hashedPassword789",
    isAdmin: true,
    isActive: true,
    enrolments: [],
    lastLogin: new Date("2024-01-22"),
  },
];
