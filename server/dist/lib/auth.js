"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const mongodb_1 = require("better-auth/adapters/mongodb");
const plugins_1 = require("better-auth/plugins");
const database_1 = require("../config/database"); // your mongodb client
const stripe_1 = require("@better-auth/stripe");
const stripe_2 = require("../config/stripe");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, mongodb_1.mongodbAdapter)(database_1.db),
    emailAndPassword: {
        enabled: true,
    },
    plugin: [
        (0, stripe_1.stripe)({
            stripeClient: stripe_2.stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
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
        (0, plugins_1.jwt)({
            jwt: {
                expirationTime: "1h",
                issuer: process.env.FRONT_END_PORT || "http://localhost:3000"
            },
            jwks: {
                keyPairConfig: { alg: "ES256" }, // EdDSA, RS256 also supported
            },
        }),
        (0, plugins_1.bearer)(),
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
