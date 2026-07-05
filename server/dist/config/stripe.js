"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeClient = void 0;
const stripe_1 = __importDefault(require("stripe"));
exports.stripeClient = new stripe_1.default(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: "2026-06-24.dahlia",
});
