"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseRoutes_1 = __importDefault(require("./courseRoutes"));
const router = (0, express_1.Router)();
router.use("/courses", courseRoutes_1.default);
exports.default = router;
