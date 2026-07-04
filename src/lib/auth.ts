import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getAdminByEmail } from "@/services/admin-user.service";
import { loginSchema } from "@/lib/validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Identifiants",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const admin = await getAdminByEmail(parsed.data.email);
        if (!admin) return null;

        const isValid = await bcrypt.compare(parsed.data.password, admin.passwordHash);
        if (!isValid) return null;

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth: session, request }) => {
      const isLoggedIn = !!session?.user;
      const isOnLogin = request.nextUrl.pathname.startsWith("/admin/login");

      if (isOnLogin) {
        return isLoggedIn ? Response.redirect(new URL("/admin", request.nextUrl)) : true;
      }

      return isLoggedIn;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id ?? session.user.id;
        session.user.role = token.role ?? "ADMIN";
      }
      return session;
    },
  },
});
