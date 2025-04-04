import { Request, Response } from "express";
import User from "../models/User";
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

    // Create user input data
    const userDataObject = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      isAdmin: isAdmin || false,
      isActive: true,
    };

    // Create user
    const user = await User.create(userDataObject);
    console.log(user);

    // Convert to plain object
    const userObj = user.toObject();

    // Create a new object with _id as first property and without password
    const userWithoutPassword = {
      id: userObj._id,
      name: userObj.name,
      email: userObj.email,
      isAdmin: userObj.isAdmin,
      isActive: userObj.isActive,
      enrolments: userObj.enrolments,
      avatar: userObj.avatar,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
      lastLogin: userObj.lastLogin,
      ...(userObj.id ? { id: userObj.id } : {}),
    };

    res.status(201).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create user",
    });
  }
};
