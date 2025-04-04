import { Router } from "express";
import { login } from "./login";
import { createUser } from "../../controllers/authController";

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post("/login", login); // Define the login route

// POST /register - Register a new user
router.post("/register", createUser);

export default router; // Export the router instance
