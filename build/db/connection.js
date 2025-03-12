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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
// import { userInfo } from "os";
require("dotenv").config();
exports.client = new mongodb_1.MongoClient(process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI;
if (!exports.client) {
    throw new Error("MongoDB URI is missing");
}
exports.db = exports.client.db("academix-ts-api");
const connectToMongoDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(MONGO_URI);
        return { status: 200, msg: "OK - Connected" };
    }
    catch (err) {
        console.error(err);
        return { status: 400, msg: "Bad Request - Could Not Connect" };
    }
});
exports.default = connectToMongoDb;
