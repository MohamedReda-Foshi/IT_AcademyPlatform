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
exports.auth = void 0;
const auth_1 = require("../lib/auth");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield auth_1.auth.api.getSession({
            headers: req.headers,
        });
        if (!session) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        req.user = {
            id: session.user.id,
            role: session.user.role || "user",
        };
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid session" });
    }
});
exports.auth = auth;
