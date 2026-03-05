"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  defaultLocale,
  getLocaleFromPathname,
  Locale,
  locales,
  localizePathname,
} from "@/lib/i18n/config";

export function LocaleSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentLocale = getLocaleFromPathname(pathname) ?? defaultLocale;
  const search = searchParams.toString();

  const switchLocale = (locale: Locale) => {
    const targetPath = localizePathname(pathname, locale);
    const target = search ? `${targetPath}?${search}` : targetPath;
    document.cookie = `NEXT_LOCALE=${locale}; path=/; samesite=lax`;
    router.push(target);
    router.refresh();
  };

  return (
    <div className="inline-flex items-center rounded-full border border-border/70 bg-card p-1">
      {locales.map((locale) => (
        <Button
          key={locale}
          variant={currentLocale === locale ? "secondary" : "ghost"}
          size="sm"
          className="h-7 rounded-full px-2.5 text-xs uppercase tracking-wide"
          onClick={() => switchLocale(locale)}
        >
          {locale}
        </Button>
      ))}
    </div>
  );
}
