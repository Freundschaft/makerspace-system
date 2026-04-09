import { DefaultSession } from "next-auth";
import { UserRole } from "@/generated/prisma";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id?: string;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    enabled?: boolean;
    role?: UserRole;
    userId?: string;
  }
}
