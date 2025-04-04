import { Router } from "express";
import { login } from "./login";

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post("/login", login); // Define the login route

export default router; // Export the router instance
