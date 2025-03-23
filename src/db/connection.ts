import mongoose from "mongoose";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MongoDB URI is missing");
}

let conn: typeof mongoose | null = null;

const connectToMongoDb = async (): Promise<typeof mongoose> => {
  if (conn == null) {
    conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      family: 4,
    });

    conn.connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });

    conn.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    conn.connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected");
    });

    // Handle process termination
    process.on("SIGINT", async () => {
      await conn?.connection.close();
      process.exit(0);
    });
  }

  return conn;
};

export default connectToMongoDb;
