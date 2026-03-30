import { headers } from "next/headers";
import { cookies } from "next/headers";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Messages = Record<string, unknown>;

function getNestedValue(messages: Messages, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (!acc || typeof acc !== "object") return undefined;
    return (acc as Record<string, unknown>)[part];
  }, messages);

  return typeof value === "string" ? value : undefined;
}

export async function getServerI18n() {
  const requestCookies = await cookies();
  const requestHeaders = await headers();
  const cookieLocale = requestCookies.get("NEXT_LOCALE")?.value;
  const headerLocale = requestHeaders.get("x-locale");
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : isLocale(headerLocale)
    ? headerLocale
    : defaultLocale;
  const messages = (await getDictionary(locale)) as Messages;

  const t = (key: string, fallback: string, params?: Record<string, string | number>) => {
    let template = getNestedValue(messages, key) ?? fallback;
    if (!params) return template;

    Object.entries(params).forEach(([name, value]) => {
      template = template.replaceAll(`{${name}}`, String(value));
    });
    return template;
  };

  return {
    locale,
    messages,
    t,
  };
}
