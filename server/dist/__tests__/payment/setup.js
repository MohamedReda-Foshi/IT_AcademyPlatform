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
exports.PLANS = exports.ORIGIN = exports.BASE_URL = exports.TEST_DB_URL = exports.STRIPE_WEBHOOK_SECRET = exports.STRIPE_PRIVATE_KEY = void 0;
exports.randomEmail = randomEmail;
exports.randomPassword = randomPassword;
exports.signUp = signUp;
exports.signIn = signIn;
exports.getSubscriptionList = getSubscriptionList;
exports.upgradeSubscription = upgradeSubscription;
exports.cancelSubscription = cancelSubscription;
exports.restoreSubscription = restoreSubscription;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../../.env") });
exports.STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
exports.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
exports.TEST_DB_URL = process.env.TEST_DB_URL || "mongodb://localhost:27017/elearn_test";
exports.BASE_URL = `http://localhost:${process.env.PORT || 8000}`;
exports.ORIGIN = process.env.BETTER_AUTH_URL || "http://localhost:3000";
exports.PLANS = {
    free: "price_1Ri8TxFyLYskgycBDaZ9jGnQ",
    "most-used": "price_1Ri8UNFyLYskgycB4JMtmM2L",
    pro: "price_1Ri8UoFyLYskgycBd1xHSMwJ",
};
function authHeaders(token) {
    return {
        "Content-Type": "application/json",
        Origin: exports.ORIGIN,
        Authorization: `Bearer ${token}`,
    };
}
function randomEmail() {
    return `test-pay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;
}
function randomPassword() {
    return `TestPass${Date.now()}!`;
}
function signUp(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const res = yield fetch(`${exports.BASE_URL}/api/auth/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: exports.ORIGIN,
            },
            body: JSON.stringify({ email, password, name: "Test User" }),
        });
        if (!res.ok) {
            const body = yield res.text();
            throw new Error(`Sign-up failed (${res.status}): ${body}`);
        }
        const data = yield res.json();
        return {
            token: (data === null || data === void 0 ? void 0 : data.token) || "",
            userId: ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id) || "",
        };
    });
}
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const res = yield fetch(`${exports.BASE_URL}/api/auth/sign-in/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Origin: exports.ORIGIN,
            },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            const body = yield res.text();
            throw new Error(`Sign-in failed (${res.status}): ${body}`);
        }
        const data = yield res.json();
        return {
            token: (data === null || data === void 0 ? void 0 : data.token) || "",
            userId: ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id) || "",
        };
    });
}
function safeJson(res) {
    return __awaiter(this, void 0, void 0, function* () {
        const text = yield res.text();
        if (!text)
            return {};
        try {
            return JSON.parse(text);
        }
        catch (_a) {
            return { raw: text };
        }
    });
}
function getSubscriptionList(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${exports.BASE_URL}/api/auth/subscription/list`, {
            method: "GET",
            headers: authHeaders(token),
        });
        return { status: res.status, body: yield safeJson(res) };
    });
}
function upgradeSubscription(token_1, plan_1) {
    return __awaiter(this, arguments, void 0, function* (token, plan, successUrl = "http://localhost:3000/success", cancelUrl = "http://localhost:3000/cancel") {
        const res = yield fetch(`${exports.BASE_URL}/api/auth/subscription/upgrade`, {
            method: "POST",
            headers: authHeaders(token),
            body: JSON.stringify({ plan, successUrl, cancelUrl }),
        });
        return { status: res.status, body: yield safeJson(res) };
    });
}
function cancelSubscription(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${exports.BASE_URL}/api/auth/subscription/cancel`, {
            method: "POST",
            headers: authHeaders(token),
        });
        return { status: res.status, body: yield safeJson(res) };
    });
}
function restoreSubscription(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${exports.BASE_URL}/api/auth/subscription/restore`, {
            method: "POST",
            headers: authHeaders(token),
        });
        return { status: res.status, body: yield safeJson(res) };
    });
}
