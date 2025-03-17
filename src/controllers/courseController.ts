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

// POST a new course;
export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, assignments, students, teachers } = req.body;

    // Validate required fields
    if (!title) {
      res.status(400).json({ error: "Course title is required" });
      return;
    }

    // Create a new course document
    const newCourse = new Course({
      title: title,
      assignments: assignments || [],
      students: students || [],
      teachers: teachers || [],
    });

    // Save the course to the database
    const savedCourse = await newCourse.save();

    // Send success response
    res.status(201).json({
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
};
