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
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("MongoDB URI is missing");
}
let conn = null;
const connectToMongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    if (conn == null) {
        conn = yield mongoose_1.default.connect(MONGO_URI, {
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
        process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (conn === null || conn === void 0 ? void 0 : conn.connection.close());
            process.exit(0);
        }));
    }
    return conn;
});
exports.default = connectToMongoDb;
