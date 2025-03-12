import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./db/connection";
import connectToMongoDb from "./db/connection";
import { ObjectId } from "mongodb";
import Course from "./models/Course";

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

connectToMongoDb();

app.get("/", (req: Request, res: Response): void => {
  try {
    res.json({
      msg: "It's working!",
    });
  } catch (x) {
    console.error(x);
    res.json({ error: x });
  }
});

app.get("/courses", async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find();
    res.json({ docs: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.json({ error });
  }
});
app.get("/courses/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }
    res.json({ data: course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error });
  }
});

app.get("/item/all", async (req: Request, res: Response): Promise<void> => {
  try {
    const allItems = await db.collection("courses").find().toArray();
    res.json({ docs: allItems });
  } catch (x) {
    console.error(x);
    res.json({ error: x });
  }
});

app.get("/item/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const singleItem = await db
      .collection("posts")
      .find({ _id: new ObjectId(id) })
      .toArray();
    res.json({ result: singleItem });
  } catch (x) {
    console.error(x);
    res.json({ error: x });
  }
});

app.listen(process.env.PORT || PORT, (): void => {
  console.log("And we're rolling! 🎥");
  console.log(`API server is live at http://localhost:${PORT}`);
});

export default app;
