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
const supertest_1 = __importDefault(require("supertest"));
const csrf_1 = require("../../middlewares/csrf");
const app = (0, express_1.default)();
app.use(express_1.default.json(), csrf_1.csrfMiddleware);
app.post("/course", (req, res) => { res.json(req.body); });
describe("browser mutation protection", () => {
    it("rejects a cross-origin write", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app).post("/course").set("Origin", "https://attacker.example").send({ title: "Course" }).expect(403);
    }));
    it("accepts the configured origin", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/course").set("Origin", "http://localhost:3000")
            .send({ title: "Safe" })
            .expect(200);
        expect(response.body.title).toBe("Safe");
    }));
});
