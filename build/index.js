"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./api/db/index"));
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, index_1.default)();
// app.get("/", (req: Request, res: Response): void => {
//   try {
//     res.json({
//       msg: "It's workin'!",
//     });
//   } catch (x) {
//     console.error(x);
//     res.json({ error: x });
//   }
// });
// app.get("/item/all", async (req: Request, res: Response): Promise<void> => {
//   try {
//     const allItems = await db.collection("posts").find().toArray();
//     res.json({ docs: allItems });
//   } catch (x) {
//     console.error(x);
//     res.json({ error: x });
//   }
// });
// app.get("/item/:id", async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   try {
//     const singleItem = await db
//       .collection("posts")
//       .find({ _id: new ObjectId(id) })
//       .toArray();
//     res.json({ result: singleItem });
//   } catch (x) {
//     console.error(x);
//     res.json({ error: x });
//   }
// });
// app.listen(process.env.PORT || PORT, (): void => {
//   console.log("And we're rolling! 🎥");
// });
// export default app;
