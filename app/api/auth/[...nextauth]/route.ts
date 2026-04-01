import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV !== "production") {
  process.env.NEXTAUTH_URL = "http://localhost:3000";
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 
