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
const stripe_1 = __importDefault(require("stripe"));
const setup_1 = require("./setup");
let stripe;
beforeAll(() => {
    stripe = new stripe_1.default(setup_1.STRIPE_PRIVATE_KEY, {
        apiVersion: "2026-06-24.dahlia",
    });
});
describe("Stripe SDK Sanity Checks", () => {
    it("should connect to Stripe API with valid key", () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield stripe.products.list({ limit: 1 });
        expect(products.data).toBeDefined();
        expect(Array.isArray(products.data)).toBe(true);
    }));
    it("should have the 'most-used' price configured in Stripe", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const price = yield stripe.prices.retrieve(setup_1.PLANS["most-used"]);
        expect(price).toBeDefined();
        expect(price.id).toBe(setup_1.PLANS["most-used"]);
        expect(price.unit_amount).toBe(2000); // $20.00
        expect((_a = price.recurring) === null || _a === void 0 ? void 0 : _a.interval).toBe("month");
    }));
    it("should have the 'pro' price configured in Stripe", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const price = yield stripe.prices.retrieve(setup_1.PLANS.pro);
        expect(price).toBeDefined();
        expect(price.id).toBe(setup_1.PLANS.pro);
        expect(price.unit_amount).toBe(3000); // $30.00
        expect((_a = price.recurring) === null || _a === void 0 ? void 0 : _a.interval).toBe("month");
    }));
    it("should have the 'free' price configured in Stripe", () => __awaiter(void 0, void 0, void 0, function* () {
        const price = yield stripe.prices.retrieve(setup_1.PLANS.free);
        expect(price).toBeDefined();
        expect(price.id).toBe(setup_1.PLANS.free);
        expect(price.unit_amount).toBe(0); // $0.00
    }));
    it("should be able to create and retrieve a test customer", () => __awaiter(void 0, void 0, void 0, function* () {
        const customer = yield stripe.customers.create({
            email: `stripe-sanity-test-${Date.now()}@test.com`,
            metadata: { test: "sanity-check" },
        });
        expect(customer.id).toMatch(/^cus_/);
        const retrieved = yield stripe.customers.retrieve(customer.id);
        expect(retrieved.id).toBe(customer.id);
        // cleanup
        yield stripe.customers.del(customer.id);
    }));
});
