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
const setup_1 = require("./setup");
let token;
let testEmail;
let testPassword;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    testEmail = (0, setup_1.randomEmail)();
    testPassword = (0, setup_1.randomPassword)();
    const auth = yield (0, setup_1.signUp)(testEmail, testPassword);
    token = auth.token;
}), 15000);
describe("Payment Flow Integration Tests", () => {
    it("should sign up a new user (creates Stripe customer)", () => __awaiter(void 0, void 0, void 0, function* () {
        const email = (0, setup_1.randomEmail)();
        const password = (0, setup_1.randomPassword)();
        const res = yield fetch(`${setup_1.BASE_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Origin: setup_1.ORIGIN },
            body: JSON.stringify({ email, password, name: "New Pay User" }),
        });
        expect(res.ok).toBe(true);
        const data = yield res.json();
        expect(data).toBeDefined();
        expect(data.user).toBeDefined();
        expect(data.user.email).toBe(email);
        expect(data.token).toBeDefined();
    }));
    it("should list subscriptions (empty for new user)", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, setup_1.getSubscriptionList)(token);
        expect(status).toBe(200);
        expect(body).toBeDefined();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(0);
    }));
    it("should upgrade to 'most-used' plan and return checkout URL", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, setup_1.upgradeSubscription)(token, "most-used");
        expect(status).toBe(200);
        expect(body).toBeDefined();
        if (body.url) {
            expect(body.url).toContain("stripe.com");
            expect(body.url).toContain("checkout");
        }
    }));
    it("should list subscriptions after upgrade attempt", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, setup_1.getSubscriptionList)(token);
        expect(status).toBe(200);
        expect(body).toBeDefined();
        expect(Array.isArray(body)).toBe(true);
    }));
    it("should upgrade to 'pro' plan (returns checkout URL)", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, setup_1.upgradeSubscription)(token, "pro");
        expect(status).toBe(200);
        expect(body).toBeDefined();
        if (body.url) {
            expect(body.url).toContain("stripe.com");
            expect(body.url).toContain("checkout");
        }
    }));
    it("should cancel the subscription", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, setup_1.cancelSubscription)(token);
        expect([200, 400]).toContain(status);
        expect(body).toBeDefined();
    }));
    it("should restore the subscription", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, setup_1.restoreSubscription)(token);
        expect([200, 400]).toContain(status);
        expect(body).toBeDefined();
    }));
    it("should list subscriptions after operations", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield (0, setup_1.getSubscriptionList)(token);
        expect(status).toBe(200);
        expect(body).toBeDefined();
        expect(Array.isArray(body)).toBe(true);
    }));
});
