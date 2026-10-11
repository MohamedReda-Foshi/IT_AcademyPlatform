import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY, PLANS } from "./setup";

let stripe: Stripe;

beforeAll(() => {
  stripe = new Stripe(STRIPE_PRIVATE_KEY, {
    apiVersion: "2026-06-24.dahlia",
  });
});

describe("Stripe SDK Sanity Checks", () => {
  it("should connect to Stripe API with valid key", async () => {
    const products = await stripe.products.list({ limit: 1 });
    expect(products.data).toBeDefined();
    expect(Array.isArray(products.data)).toBe(true);
  });

  it("should have the 'most-used' price configured in Stripe", async () => {
    const price = await stripe.prices.retrieve(PLANS["most-used"]);
    expect(price).toBeDefined();
    expect(price.id).toBe(PLANS["most-used"]);
    expect(price.unit_amount).toBe(2000); // $20.00
    expect(price.recurring?.interval).toBe("month");
  });

  it("should have the 'pro' price configured in Stripe", async () => {
    const price = await stripe.prices.retrieve(PLANS.pro);
    expect(price).toBeDefined();
    expect(price.id).toBe(PLANS.pro);
    expect(price.unit_amount).toBe(3000); // $30.00
    expect(price.recurring?.interval).toBe("month");
  });

  it("should have the 'free' price configured in Stripe", async () => {
    const price = await stripe.prices.retrieve(PLANS.free);
    expect(price).toBeDefined();
    expect(price.id).toBe(PLANS.free);
    expect(price.unit_amount).toBe(0); // $0.00
  });

  it("should be able to create and retrieve a test customer", async () => {
    const customer = await stripe.customers.create({
      email: `stripe-sanity-test-${Date.now()}@test.com`,
      metadata: { test: "sanity-check" },
    });
    expect(customer.id).toMatch(/^cus_/);

    const retrieved = await stripe.customers.retrieve(customer.id);
    expect(retrieved.id).toBe(customer.id);

    // cleanup
    await stripe.customers.del(customer.id);
  });
});
