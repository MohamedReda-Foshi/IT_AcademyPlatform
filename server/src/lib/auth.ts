import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt, bearer } from "better-auth/plugins";
import { db } from "../config/database"; // your mongodb client
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"
import { stripeClient } from "../config/stripe";

export const auth = betterAuth({
  database: mongodbAdapter(db),

  trustedOrigins: [process.env.CORS_ORIGIN || "http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
  },


  plugins: [
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "free",
            priceId: "price_1Ri8TxFyLYskgycBDaZ9jGnQ",
          },
          {
            name: "most-used",
            priceId: "price_1Ri8UNFyLYskgycB4JMtmM2L",
          },
          {
            name: "pro",
            priceId: "price_1Ri8UoFyLYskgycBd1xHSMwJ",
          },
        ],
      },
    }),

    jwt({
     jwt: {
      expirationTime: "1h",
      issuer :process.env.FRONT_END_PORT || "http://localhost:3000"
     },
    jwks:{
          keyPairConfig: { alg: "ES256" }, // EdDSA, RS256 also supported
      },
  }),
    bearer(),
  ],
  /*
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },

  }, */

  user: {
    additionalFields: {
      lastName: {
        type: "string",
        required: false,
        input: true,
      },
      role: {
        type: ["user", "admin", "instrator"],
        required: false,
        defaultValue: "user",
        input: false,
      },
      about: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      isVerified: {
        type: "boolean",
        defaultValue: false,
        input: false,
        required: false,
      },

      createdAt: {
        type: "string",
        required: false,
      },
      updatedAt: {
        type: "string",
        required: false,
      },

    }
  }
});
