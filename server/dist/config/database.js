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
exports.db = exports.client = void 0;
exports.connection = connection;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DATAURL = process.env.DATAURL;
// Native MongoClient — required by better-auth's mongodbAdapter
exports.client = new mongodb_1.MongoClient(DATAURL);
exports.db = exports.client.db(); // uses the DB name from the URI
// Mongoose connection function — used by your app server
function connection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(DATAURL);
            console.log("Database connected!");
        }
        catch (err) {
            console.log("MongoDB connection error:", err);
            process.exit(1);
        }
    });
}
