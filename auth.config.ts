import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized() {
  return true;
},
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.uuid = user.uuid;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.user.uuid = token.uuid as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                username: credentials.email,
                password: credentials.password,
                expiresInMins: 30,
              }),
            }
          );

          const json = await res.json();
          if (!res.ok) return null;

          return {
            id: String(json.id),
            uuid: String(json.id),
            name: `${json.firstName} ${json.lastName}`,
            email: json.email,
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
};