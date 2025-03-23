import { Request, Response } from "express";
import Course, { ICourse } from "../models/Course";
import mongoose from "mongoose";

// GET all courses (with filtering for archived)
export const getAllCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { term, published } = req.query;
    const filter: Record<string, any> = { isArchived: false };

    if (term) filter.term = term;
    if (published !== undefined) filter.isPublished = published === "true";

    const courses = await Course.find(filter)
      .populate("teachers", "name email")
      .populate("teachingAssistants", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch courses",
    });
  }
};

// GET single course by ID
export const getCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("teachers", "name email")
      .populate("teachingAssistants", "name email")
      .populate("students", "name email")
      .populate("assignments")
      .populate("modules");

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({
        success: false,
        error: "Invalid course ID",
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch course",
    });
  }
};

// POST create new course
export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      courseCode,
      sisId,
      description,
      term,
      accessFrom,
      accessUntil,
      teachers,
    } = req.body;

    // Validate required fields
    if (!title || !courseCode || !sisId || !description || !term || !teachers) {
      res.status(400).json({
        success: false,
        error: "Please provide all required fields",
      });
      return;
    }

    const course = await Course.create({
      ...req.body,
      isPublished: false,
      isArchived: false,
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }

    if ((error as any).code === 11000) {
      res.status(400).json({
        success: false,
        error: "Course code or SIS ID already exists",
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Failed to create course",
    });
  }
};

// PUT update course
export const updateCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    // Prevent updating unique fields if they already exist
    if (req.body.courseCode || req.body.sisId) {
      const existingCourse = await Course.findOne({
        $or: [{ courseCode: req.body.courseCode }, { sisId: req.body.sisId }],
        _id: { $ne: req.params.id },
      });

      if (existingCourse) {
        res.status(400).json({
          success: false,
          error: "Course code or SIS ID already exists",
        });
        return;
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Failed to update course",
    });
  }
};

// DELETE course (soft delete by archiving)
export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    // Soft delete by archiving
    course.isArchived = true;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course archived successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to archive course",
    });
  }
};

// POST add student to course
export const addStudentToCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { studentId } = req.body;
    const courseId = req.params.id;

    if (!studentId) {
      res.status(400).json({
        success: false,
        error: "Please provide student ID",
      });
      return;
    }

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    // Check if student is already enrolled
    if (course.students.includes(studentId)) {
      res.status(400).json({
        success: false,
        error: "Student is already enrolled in this course",
      });
      return;
    }

    course.students.push(studentId);
    await course.save();

    res.status(200).json({
      success: true,
      message: "Student added to course successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add student to course",
    });
  }
};

// POST add assignment to course
export const addAssignmentToCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { assignmentId } = req.body;
    const courseId = req.params.id;

    if (!assignmentId) {
      res.status(400).json({
        success: false,
        error: "Please provide assignment ID",
      });
      return;
    }

    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    // Check if assignment is already added
    if (course.assignments.includes(assignmentId)) {
      res.status(400).json({
        success: false,
        error: "Assignment is already added to this course",
      });
      return;
    }

    course.assignments.push(assignmentId);
    await course.save();

    res.status(200).json({
      success: true,
      message: "Assignment added to course successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add assignment to course",
    });
  }
};
