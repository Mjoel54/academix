"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./api/index"));
const router = (0, express_1.Router)();
router.use("/", index_1.default);
router.use((_req, res) => {
    return res.send("404 Not Found");
});
exports.default = router;
