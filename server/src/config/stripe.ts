import Stripe from "stripe";

export const stripeClient = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});
