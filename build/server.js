"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./db/connection");
const connection_2 = __importDefault(require("./db/connection"));
const mongodb_1 = require("mongodb");
const Course_1 = __importDefault(require("./models/Course"));
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, connection_2.default)();
app.get("/", (req, res) => {
    try {
        res.json({
            msg: "It's working!",
        });
    }
    catch (x) {
        console.error(x);
        res.json({ error: x });
    }
});
app.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.find();
        res.json({ docs: courses });
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.json({ error });
    }
}));
app.get("/item/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allItems = yield connection_1.db.collection("courses").find().toArray();
        res.json({ docs: allItems });
    }
    catch (x) {
        console.error(x);
        res.json({ error: x });
    }
}));
app.get("/item/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const singleItem = yield connection_1.db
            .collection("posts")
            .find({ _id: new mongodb_1.ObjectId(id) })
            .toArray();
        res.json({ result: singleItem });
    }
    catch (x) {
        console.error(x);
        res.json({ error: x });
    }
}));
app.listen(process.env.PORT || PORT, () => {
    console.log("And we're rolling! 🎥");
    console.log(`API server is live at http://localhost:${PORT}`);
});
exports.default = app;
