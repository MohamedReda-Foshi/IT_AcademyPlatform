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
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, database_1.connection)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Home page!");
});
//auth 
// 
// 
// 
// Login Post: /api/auth/sign-in/email
// Registration: Post /api/auth/sign-up/email
// Get Session : Get /api/auth/get-Session
// Logout: Post /api/auth/sign-out
app.use((0, cors_1.default)({
    origin: `${process.env.FRONT_END_PORT}` || "http://localhost:3000", // frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));
app.all("/api/auth/*", (0, node_1.toNodeHandler)(auth_1.auth));
app.use('/dashboard', adminRoute_1.default);
app.use('/chapter', Chapter_1.default);
app.use('/user', userRoute_1.default);
app.use('/course', courseRoute_1.default);
app.use('/instructor', instructorRoute_1.default);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.connect(); // connect native MongoClient (for better-auth)
        yield (0, database_1.connection)(); // connect Mongoose (for your models)
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}`);
        });
    });
}
bootstrap();
exports.default = app;
