import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import {
  defaultLocale,
  getLocaleFromPathname,
  isLocale,
  localizePathname,
  Locale,
  removeLocaleFromPathname,
} from "@/lib/i18n/config";

function getPreferredLocale(acceptLanguage: string): Locale | null {
  if (!acceptLanguage) {
    return null;
  }

  const preferredLocales = acceptLanguage
    .split(",")
    .map((entry) => {
      const [languageTag, ...params] = entry.trim().toLowerCase().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam ? Number.parseFloat(qualityParam.split("=")[1] ?? "1") : 1;

      return {
        locale: languageTag.split("-")[0],
        quality: Number.isFinite(quality) ? quality : 0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { locale } of preferredLocales) {
    if (isLocale(locale)) {
      return locale;
    }
  }

  return null;
}

function detectLocale(request: NextRequest): Locale {
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(localeCookie)) {
    return localeCookie;
  }

  const preferredLocale = getPreferredLocale(
    request.headers.get("accept-language") ?? "",
  );
  if (preferredLocale) {
    return preferredLocale;
  }

  return defaultLocale;
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = getLocaleFromPathname(pathname);

  if (!pathnameLocale) {
    const locale = detectLocale(request);
    const localizedPath = localizePathname(pathname, locale);
    const localizedUrl = new URL(localizedPath, request.url);
    localizedUrl.search = request.nextUrl.search;
    return NextResponse.redirect(localizedUrl);
  }

  const locale = pathnameLocale;
  const internalPathname = removeLocaleFromPathname(pathname);
  const token = await getToken({ req: request });
  const hasActiveSession = Boolean(token && token.enabled !== false);
  const isAuthPage = internalPathname.startsWith("/login");

  if (isAuthPage) {
    if (hasActiveSession) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  if (!hasActiveSession && !isAuthPage) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const rewrittenUrl = new URL(internalPathname, request.url);
  rewrittenUrl.search = request.nextUrl.search;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-internal-pathname", internalPathname);

  const response = NextResponse.rewrite(rewrittenUrl, {
    request: {
      headers: requestHeaders,
    },
  });
  response.cookies.set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)",
  ],
};
