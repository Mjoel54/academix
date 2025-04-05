import request from "supertest";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import app from "../src/app";
import User from "../src/models/User";
import startServer from "../src/server";

describe("Authentication API Tests", () => {
  beforeAll(async () => {
    // Connect to the database before running tests
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/academix-test"
    );

    //create a test user
    await User.create({
      name: "Test User",
      email: "existing@example.com",
      password: "password123",
      isAdmin: false,
    });
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
  });
});
