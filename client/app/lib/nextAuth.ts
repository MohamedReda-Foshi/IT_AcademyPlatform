import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from "jwt-decode";

declare module "next-auth" {
  interface User {
    role: string;
    _id?: string;
    token?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string ;
      email: string ;
      image: string;
      role: string;
       _id?: string;
       plan:string;
       token:string;

    }
  }
}


export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {email: {},password:{}},
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password

            }),
            
          });
        


          const data = await res.json();
//          localStorage.setItem('token',data)
          if (data?.data) {
            // This means login failed: backend returned { data: "error" }
            throw new Error(data.data);
          }

          const decoded = jwtDecode(data) as { id: string; email: string;name:string; role: string };
          console.log('Decoded token:', decoded);
          return {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            token: data,
          };

        } catch (err) {
          console.log("Authorize error:", err);
          throw new Error("Invalid email or password");
        }
            }
      }
    ),

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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }

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
        plan: "free"
      };
      console.log("this is session:",session.user)
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};