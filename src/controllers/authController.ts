import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";

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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user: HydratedDocument<IUser> = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      isAdmin: isAdmin || false,
      isActive: true,
    });

    await user.save();

    // Fetch the fresh user from database
    const freshUser = await User.findById(user._id).select("-password");

    if (!freshUser) {
      res.status(500).json({
        success: false,
        error: "Failed to retrieve created user",
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: {
        ...freshUser.toObject(),
        id: user._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create user",
    });
  }
};
