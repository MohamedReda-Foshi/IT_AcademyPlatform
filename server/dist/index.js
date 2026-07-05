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
const database_1 = require("./config/database");
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const courseRoute_1 = __importDefault(require("./routes/courseRoute"));
const Chapter_1 = __importDefault(require("./routes/Chapter"));
const instructorRoute_1 = __importDefault(require("./routes/instructorRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONT_END_PORT || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));
app.use(express_1.default.json({
    verify: (req, _res, buf) => { req.rawBody = buf; }
}));
app.get("/", (_req, res) => {
    res.send("Home page!");
});
app.all("/api/auth/*", (0, node_1.toNodeHandler)(auth_1.auth));
app.use("/dashboard", adminRoute_1.default);
app.use("/chapter", Chapter_1.default);
app.use("/user", userRoute_1.default);
app.use("/course", courseRoute_1.default);
app.use("/instructor", instructorRoute_1.default);
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal server error" });
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.connect();
        yield (0, database_1.connection)();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}`);
        });
    });
}
bootstrap();
exports.default = app;
