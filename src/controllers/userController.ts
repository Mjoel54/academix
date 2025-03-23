import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import User, { IUser } from "../models/User";
import { CourseRole } from "../models/Enrolments";

// GET all users (with filtering and pagination)
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10, role, isActive } = req.query;
    const filter: Record<string, any> = {};

    // Add filters if provided
    if (role) {
      filter["enrolments.role"] = role;
    }
    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const users = await User.find(filter)
      .select("-password") // Exclude password
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
    });
  }
};

// GET single user by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate({
        path: "enrolments.course",
        select: "title courseCode",
      });

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
    });
  }
};

// POST create new user
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        error: "Please provide all required fields",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(400).json({
        success: false,
        error: "Email already registered",
      });
      return;
    }

    // Create user
    const user: HydratedDocument<IUser> = new User({
      name,
      email: email.toLowerCase(),
      password, // Note: Password should be hashed before saving
      isAdmin: isAdmin || false,
      isActive: true,
    });

    await user.save();

    // Remove password from response
    const { password: _, ...userResponse } = user.toObject();

    res.status(201).json({
      success: true,
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create user",
    });
  }
};

// PUT update user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, isActive, avatar } = req.body;
    const updates: Record<string, any> = {};

    // Build update object with only provided fields
    if (name) updates.name = name;
    if (email) updates.email = email.toLowerCase();
    if (isActive !== undefined) updates.isActive = isActive;
    if (avatar) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if ((error as any).code === 11000) {
      res.status(400).json({
        success: false,
        error: "Email already exists",
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: "Failed to update user",
    });
  }
};

// DELETE user (soft delete)
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    // Soft delete
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete user",
    });
  }
};

// POST add course enrolment
export const addCourseEnrolment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { courseId, role } = req.body;
    const userId = req.params.id;

    if (!courseId || !role) {
      res.status(400).json({
        success: false,
        error: "Please provide courseId and role",
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    await user.addEnrolment(courseId, role as CourseRole);

    res.status(200).json({
      success: true,
      message: "Course enrolment added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add course enrolment",
    });
  }
};

// PUT update course enrolment
export const updateCourseEnrolment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { courseId, updates } = req.body;
    const userId = req.params.id;

    if (!courseId || !updates) {
      res.status(400).json({
        success: false,
        error: "Please provide courseId and updates",
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    await user.updateEnrolment(courseId, updates);

    res.status(200).json({
      success: true,
      message: "Course enrolment updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update course enrolment",
    });
  }
};

// DELETE remove course enrolment
export const removeCourseEnrolment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { courseId } = req.body;
    const userId = req.params.id;

    if (!courseId) {
      res.status(400).json({
        success: false,
        error: "Please provide courseId",
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
      return;
    }

    await user.removeEnrolment(courseId);

    res.status(200).json({
      success: true,
      message: "Course enrolment removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to remove course enrolment",
    });
  }
};
