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
const userModel_1 = require("../models/userModel");
const auth_1 = require("../middlewares/auth");
const roleauth_1 = require("../middlewares/roleauth");
const router = express_1.default.Router();
router.get("/AdminUser", auth_1.auth, (0, roleauth_1.role)("admin"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userModel_1.userModel
            .find({ role: "admin" })
            .select("name lastName email");
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
router.delete("/deleuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const data = yield userModel_1.userModel.findByIdAndDelete(id);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(404).json(err);
    }
}));
exports.default = router;
