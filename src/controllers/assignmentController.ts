import { Request, Response } from "express";
import Course from "../models/Course";
import mongoose from "mongoose";
import { IAssignment } from "../models/Assignment";

// GET all assignments for a course
export const getCourseAssignments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    const assignments = course.assignments.sort(
      (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
    );

    res.status(200).json({
      success: true,
      count: assignments.length,
      data: assignments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch assignments",
    });
  }
};

// GET single assignment by ID
export const getAssignmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { courseId, assignmentId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    const assignment = course.assignments.id(assignmentId);

    if (!assignment) {
      res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({
        success: false,
        error: "Invalid assignment ID",
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch assignment",
    });
  }
};

// POST create new assignment
export const createAssignment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    const newAssignment: IAssignment = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    course.assignments.push(newAssignment);
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
    const { courseId, assignmentId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    const assignment = course.assignments.id(assignmentId);

    if (!assignment) {
      res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
      return;
    }

    Object.assign(assignment, {
      ...req.body,
      updatedAt: new Date(),
    });

    await course.save();

    res.status(200).json({
      success: true,
      data: assignment,
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
    const { courseId, assignmentId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      res.status(404).json({
        success: false,
        error: "Course not found",
      });
      return;
    }

    const assignment = course.assignments.id(assignmentId);

    if (!assignment) {
      res.status(404).json({
        success: false,
        error: "Assignment not found",
      });
      return;
    }

    await assignment.deleteOne();
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
