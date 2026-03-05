'use client';

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/app/components/I18nProvider";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const { t } = useI18n();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  useEffect(() => {
    void signIn("google", { callbackUrl });
  }, [callbackUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">{t("auth.redirecting", "Redirecting to Google sign-in...")}</p>
    </div>
  );
}
