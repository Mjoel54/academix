import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    // Create user input data
    const userDataObject = {
      name: name,
      email: email.toLowerCase(),
      password: password, // The password will be hashed by the pre-save hook
      isAdmin: isAdmin || false,
      isActive: true,
    };

    // Create user
    const user = await User.create(userDataObject);

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

// Post login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Please provide all required fields",
    });
    return;
  }

  // Find the user in the database by email
  const user = await User.findOne({ email: email.toLowerCase() });

  // If user is not found, send an authentication failed response.
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Compare the provided password with the stored hashed password using the model method
  const passwordIsValid = await user.comparePassword(password);

  // If password is invalid, send an authentication failed response
  if (!passwordIsValid) {
    return res
      .status(401)
      .json({ message: "Authentication failed passwordIsValid" });
  }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || "";

  // Generate a JWT token for the authenticated user
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secretKey,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    success: true,
    token,
  });
};
