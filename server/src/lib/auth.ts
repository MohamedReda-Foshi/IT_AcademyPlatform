import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt, bearer } from "better-auth/plugins";
import { db } from "../config/database"; // your mongodb client

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
  emailAndPassword: { 
    enabled: true, 
  },  

  
  plugin: [
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
        type: ["user", "admin", "moderator"],
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
