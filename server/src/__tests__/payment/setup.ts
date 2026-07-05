import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY!;
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
export const TEST_DB_URL =
  process.env.TEST_DB_URL || "mongodb://localhost:27017/elearn_test";
export const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;
export const ORIGIN = process.env.BETTER_AUTH_URL || "http://localhost:3000";

export const PLANS = {
  free: "price_1Ri8TxFyLYskgycBDaZ9jGnQ",
  "most-used": "price_1Ri8UNFyLYskgycB4JMtmM2L",
  pro: "price_1Ri8UoFyLYskgycBd1xHSMwJ",
} as const;

function authHeaders(token: string): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Origin: ORIGIN,
    Authorization: `Bearer ${token}`,
  };
}

export function randomEmail(): string {
  return `test-pay-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.com`;
}

export function randomPassword(): string {
  return `TestPass${Date.now()}!`;
}

export interface AuthTokens {
  token: string;
  userId: string;
}

export async function signUp(
  email: string,
  password: string
): Promise<AuthTokens> {
  const res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: ORIGIN,
    },
    body: JSON.stringify({ email, password, name: "Test User" }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sign-up failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  return {
    token: data?.token || "",
    userId: data?.user?.id || "",
  };
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthTokens> {
  const res = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: ORIGIN,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Sign-in failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  return {
    token: data?.token || "",
    userId: data?.user?.id || "",
  };
}

async function safeJson(res: Response) {
  const text = await res.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

export async function getSubscriptionList(token: string) {
  const res = await fetch(`${BASE_URL}/api/auth/subscription/list`, {
    method: "GET",
    headers: authHeaders(token),
  });
  return { status: res.status, body: await safeJson(res) };
}

export async function upgradeSubscription(
  token: string,
  plan: string,
  successUrl = "http://localhost:3000/success",
  cancelUrl = "http://localhost:3000/cancel"
) {
  const res = await fetch(`${BASE_URL}/api/auth/subscription/upgrade`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ plan, successUrl, cancelUrl }),
  });
  return { status: res.status, body: await safeJson(res) };
}

export async function cancelSubscription(token: string) {
  const res = await fetch(`${BASE_URL}/api/auth/subscription/cancel`, {
    method: "POST",
    headers: authHeaders(token),
  });
  return { status: res.status, body: await safeJson(res) };
}

export async function restoreSubscription(token: string) {
  const res = await fetch(`${BASE_URL}/api/auth/subscription/restore`, {
    method: "POST",
    headers: authHeaders(token),
  });
  return { status: res.status, body: await safeJson(res) };
}
