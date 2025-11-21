import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";
//import { Resend as ResendClient } from "resend";


declare module "next-auth" {
  interface User {
    role: string;
    _id?: string;
    token?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
      _id?: string;
      plan: string;
      token: string;
    };
  }
}

//const resend = new ResendClient(process.env.RESEND_API_KEY);

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
   

    Credentials({
      name: "credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await res.json();
          //          localStorage.setItem('token',data)
          if (!res.ok || !data.token) {
            throw new Error(data.message || "Login failed");
          }

          const decoded = jwtDecode(data.token) as {
            id: string;
            name: string;
            email: string;
            role: string;
            token: string,
          };
          console.log("Decoded token:", decoded);
          console.log(" This is a token:", data.token);
          return {
             id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token, 
          };
        } catch (err) {
          console.log("Authorize error:", err);
          throw new Error("Invalid email or password");
        }
      },
    }),

    Google({
      profile(profile) {
        console.log("Google Profile", profile);
        let userRole = "User";
        if (profile?.email == "reda.foshi11@gmail.com") {
          userRole = "admin";
        }
        return {
          id: profile.sub, // Changed from profile.id to profile.sub
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          role: userRole,
          token:profile.token
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      profile(profile) {
        console.log("GitHub Profile", profile);
        let userRole = "github User";
        if (profile?.email == "reda.foshi11@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token,user }) {
      if ( user) {
      token.id = user.id;
      token.role = user.role;
      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;
      token.token = user.token; // Your backend token
      
      }
      // <-- logs on login only
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
      name: token.name as string,
      email: token.email as string,
      image: token.picture as string,
      role: token.role as string,
      token: token.token as string,
      plan: "free",
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};
