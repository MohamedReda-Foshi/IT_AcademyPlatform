import crypto from "crypto";
import { STRIPE_WEBHOOK_SECRET, ORIGIN } from "./setup";

const BASE_URL = process.env.BASE_URL || "http://localhost:8000";

function signPayload(payload: string, secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");
  return `t=${timestamp},v1=${signature}`;
}

describe("Webhook Signature Verification Tests", () => {
  it("should reject webhook with no signature header", async () => {
    const payload = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: {} },
    });

    const res = await fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: ORIGIN },
      body: payload,
    });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("should reject webhook with invalid signature", async () => {
    const payload = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: {} },
    });

    const res = await fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN,
        "stripe-signature": "invalid_signature_here",
      },
      body: payload,
    });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("should reject webhook with tampered payload", async () => {
    const originalPayload = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: { id: "cs_test_123" } },
    });
    const tamperedPayload = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: { id: "cs_tampered_456" } },
    });

    const signature = signPayload(originalPayload, STRIPE_WEBHOOK_SECRET);

    const res = await fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN,
        "stripe-signature": signature,
      },
      body: tamperedPayload,
    });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("should reject webhook with wrong webhook secret", async () => {
    const payload = JSON.stringify({
      type: "checkout.session.completed",
      data: { object: { id: "cs_test_123" } },
    });

    const signature = signPayload(payload, "whsec_wrong_secret");

    const res = await fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN,
        "stripe-signature": signature,
      },
      body: payload,
    });

    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("should accept webhook with valid signature", async () => {
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

    const signature = signPayload(payload, STRIPE_WEBHOOK_SECRET);

    const res = await fetch(`${BASE_URL}/api/auth/stripe/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN,
        "stripe-signature": signature,
      },
      body: payload,
    });

    expect(res.status).not.toBe(400);
  });
});
