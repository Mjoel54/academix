import { Request, Response } from "express";
import Course, { ICourse } from "../models/Course";
import { IAssignment } from "../models/Assignment";
import mongoose from "mongoose";
import Term from "../models/Term";

// GET all courses (with filtering for archived)
export const getAllCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { term, published } = req.query;
    const filter: Record<string, any> = { isArchived: false };

    if (term) {
      // If term is provided, find the term ID and use it in the filter
      const termDoc = await Term.findOne({ name: term });
      if (termDoc) {
        filter.term = termDoc._id;
      }
    }
    if (published !== undefined) filter.isPublished = published === "true";

    const courses = await Course.find(filter)
      .populate("term", "name startDate endDate status")
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
      .populate("students", "name email");

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

    // Validate that the term exists
    const termDoc = await Term.findById(term);
    if (!termDoc) {
      res.status(400).json({
        success: false,
        error: "Invalid term ID",
      });
      return;
    }

    const course = await Course.create({
      ...req.body,
      isPublished: false,
      isArchived: false,
    });

    // Populate the term data in the response
    const populatedCourse = await Course.findById(course._id)
      .populate("term", "name startDate endDate status")
      .populate("teachers", "name email")
      .populate("teachingAssistants", "name email");

    res.status(201).json({
      success: true,
      data: populatedCourse,
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

// DELETE course
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

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete course",
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

// GET course assignments
export const getCourseAssignments = async (
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

    res.status(200).json({
      success: true,
      count: course.assignments.length,
      data: course.assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch assignments",
    });
  }
};

// POST create assignment
export const createAssignment = async (
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

    course.assignments.push(req.body);
    await course.save();

    res.status(201).json({
      success: true,
      data: course.assignments[course.assignments.length - 1],
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
      error: "Failed to create assignment",
    });
  }
};

// PUT update assignment
export const updateAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: courseId, assignmentId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    const assignmentIndex = course.assignments.findIndex(
      (a) => a._id.toString() === assignmentId
    );

    if (assignmentIndex === -1) {
      res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
      return;
    }

    course.assignments[assignmentIndex] = {
      ...course.assignments[assignmentIndex].toObject(),
      ...req.body,
    };

    await course.save();

    res.status(200).json({
      success: true,
      data: course.assignments[assignmentIndex],
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
      error: "Failed to update assignment",
    });
  }
};

// DELETE assignment
export const deleteAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id: courseId, assignmentId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    const assignmentIndex = course.assignments.findIndex(
      (a) => a._id.toString() === assignmentId
    );

    if (assignmentIndex === -1) {
      res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
      return;
    }

    course.assignments.splice(assignmentIndex, 1);
    await course.save();

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete assignment",
    });
  }
};
