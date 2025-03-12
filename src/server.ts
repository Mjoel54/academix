import express from "express";
import cors from "cors";
import connectToMongoDb from "./db/connection";
import routes from "./routes";

require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connectToMongoDb();

app.listen(process.env.PORT || PORT, (): void => {
  console.log("And we're rolling! 🎥");
  console.log(`API server is live at http://localhost:${PORT}`);
});

export default app;
