export const locales = ["en", "el", "fr", "ar", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  return isLocale(maybeLocale) ? maybeLocale : null;
}

export function removeLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname;

  const withoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");
  return withoutLocale.length > 0 ? withoutLocale : "/";
}

export function localizePathname(pathname: string, locale: Locale): string {
  const stripped = removeLocaleFromPathname(pathname);
  if (stripped === "/") return `/${locale}`;
  return `/${locale}${stripped}`;
}
