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
const roleauth_1 = require("../middlewares/roleauth");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/getuser", auth_1.auth, (0, roleauth_1.role)("admin"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Userdata = yield userModel_1.userModel
            .find()
            .select("name lastName email role");
        res.status(200).json(Userdata);
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
router.get("/getusername/:id", auth_1.auth, (0, roleauth_1.role)("admin"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params._id;
        const UserName = yield userModel_1.userModel
            .findById(id)
            .select("name lastName");
        res.status(200).json(UserName);
        next();
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
exports.default = router;
