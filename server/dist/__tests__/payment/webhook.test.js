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
const crypto_1 = __importDefault(require("crypto"));
const setup_1 = require("./setup");
const BASE_URL = process.env.BASE_URL || "http://localhost:8000";
function signPayload(payload, secret) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signedPayload = `${timestamp}.${payload}`;
    const signature = crypto_1.default
        .createHmac("sha256", secret)
        .update(signedPayload)
        .digest("hex");
    return `t=${timestamp},v1=${signature}`;
}
describe("Webhook Signature Verification Tests", () => {
    it("should reject webhook with no signature header", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = JSON.stringify({
            type: "checkout.session.completed",
            data: { object: {} },
        });
        const res = yield fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Origin: setup_1.ORIGIN },
            body: payload,
        });
        expect(res.status).toBeGreaterThanOrEqual(400);
    }));
    it("should reject webhook with invalid signature", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = JSON.stringify({
            type: "checkout.session.completed",
            data: { object: {} },
        });
        const res = yield fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: setup_1.ORIGIN,
                "stripe-signature": "invalid_signature_here",
            },
            body: payload,
        });
        expect(res.status).toBeGreaterThanOrEqual(400);
    }));
    it("should reject webhook with tampered payload", () => __awaiter(void 0, void 0, void 0, function* () {
        const originalPayload = JSON.stringify({
            type: "checkout.session.completed",
            data: { object: { id: "cs_test_123" } },
        });
        const tamperedPayload = JSON.stringify({
            type: "checkout.session.completed",
            data: { object: { id: "cs_tampered_456" } },
        });
        const signature = signPayload(originalPayload, setup_1.STRIPE_WEBHOOK_SECRET);
        const res = yield fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: setup_1.ORIGIN,
                "stripe-signature": signature,
            },
            body: tamperedPayload,
        });
        expect(res.status).toBeGreaterThanOrEqual(400);
    }));
    it("should reject webhook with wrong webhook secret", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = JSON.stringify({
            type: "checkout.session.completed",
            data: { object: { id: "cs_test_123" } },
        });
        const signature = signPayload(payload, "whsec_wrong_secret");
        const res = yield fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: setup_1.ORIGIN,
                "stripe-signature": signature,
            },
            body: payload,
        });
        expect(res.status).toBeGreaterThanOrEqual(400);
    }));
    it("should accept webhook with valid signature", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = JSON.stringify({
            id: "evt_test_valid",
            type: "checkout.session.completed",
            data: {
                object: {
                    id: "cs_test_valid",
                    subscription: "sub_test_123",
                    customer: "cus_test_123",
                },
            },
        });
        const signature = signPayload(payload, setup_1.STRIPE_WEBHOOK_SECRET);
        const res = yield fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: setup_1.ORIGIN,
                "stripe-signature": signature,
            },
            body: payload,
        });
        expect(res.status).not.toBe(400);
    }));
});
