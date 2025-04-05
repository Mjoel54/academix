import app from "./app";
import connectToMongoDb from "./db/connection";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToMongoDb();
    console.log("📦 Connected to MongoDB");

    // Start Express server
    app.listen(PORT, () => {
      console.log("And we're rolling! 🎥");
      console.log(`API server is live at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default startServer;
