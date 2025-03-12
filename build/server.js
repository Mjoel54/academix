"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./db/connection"));
const routes_1 = __importDefault(require("./routes"));
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(routes_1.default);
(0, connection_1.default)();
app.listen(process.env.PORT || PORT, () => {
    console.log("And we're rolling! 🎥");
    console.log(`API server is live at http://localhost:${PORT}`);
});
exports.default = app;
