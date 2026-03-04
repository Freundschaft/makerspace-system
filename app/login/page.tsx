'use client';

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  useEffect(() => {
    void signIn("google", { callbackUrl });
  }, [callbackUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">Redirecting to Google sign-in...</p>
    </div>
  );
}
