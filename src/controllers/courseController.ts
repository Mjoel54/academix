import { Request, Response } from "express";
import Course from "../models/Course";

// GET all courses;
export const getAllCourses = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await Course.find();
    res.json({ docs: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.json({ error });
  }
};
