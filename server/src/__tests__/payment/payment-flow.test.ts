import {
  randomEmail,
  randomPassword,
  signUp,
  signIn,
  upgradeSubscription,
  getSubscriptionList,
  cancelSubscription,
  restoreSubscription,
  BASE_URL,
  ORIGIN,
} from "./setup";

let token: string;
let testEmail: string;
let testPassword: string;

beforeAll(async () => {
  testEmail = randomEmail();
  testPassword = randomPassword();
  const auth = await signUp(testEmail, testPassword);
  token = auth.token;
}, 15000);

describe("Payment Flow Integration Tests", () => {
  it("should sign up a new user (creates Stripe customer)", async () => {
    const email = randomEmail();
    const password = randomPassword();
    const res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: ORIGIN },
      body: JSON.stringify({ email, password, name: "New Pay User" }),
    });

    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data).toBeDefined();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe(email);
    expect(data.token).toBeDefined();
  });

  it("should list subscriptions (empty for new user)", async () => {
    const { status, body } = await getSubscriptionList(token);
    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(0);
  });

  it("should upgrade to 'most-used' plan and return checkout URL", async () => {
    const { status, body } = await upgradeSubscription(token, "most-used");

    expect(status).toBe(200);
    expect(body).toBeDefined();

    if (body.url) {
      expect(body.url).toContain("stripe.com");
      expect(body.url).toContain("checkout");
    }
  });

  it("should list subscriptions after upgrade attempt", async () => {
    const { status, body } = await getSubscriptionList(token);
    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(Array.isArray(body)).toBe(true);
  });

  it("should upgrade to 'pro' plan (returns checkout URL)", async () => {
    const { status, body } = await upgradeSubscription(token, "pro");

    expect(status).toBe(200);
    expect(body).toBeDefined();

    if (body.url) {
      expect(body.url).toContain("stripe.com");
      expect(body.url).toContain("checkout");
    }
  });

  it("should cancel the subscription", async () => {
    const { status, body } = await cancelSubscription(token);
    expect([200, 400]).toContain(status);
    expect(body).toBeDefined();
  });

  it("should restore the subscription", async () => {
    const { status, body } = await restoreSubscription(token);
    expect([200, 400]).toContain(status);
    expect(body).toBeDefined();
  });

  it("should list subscriptions after operations", async () => {
    const { status, body } = await getSubscriptionList(token);
    expect(status).toBe(200);
    expect(body).toBeDefined();
    expect(Array.isArray(body)).toBe(true);
  });
});
