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

function detectLocale(request: NextRequest): Locale {
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(localeCookie)) {
    return localeCookie;
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (acceptLanguage.includes("fr")) {
    return "fr";
  }
  if (acceptLanguage.includes("el")) {
    return "el";
  }
  if (acceptLanguage.includes("fa")) {
    return "fa";
  }
  if (acceptLanguage.includes("ar")) {
    return "ar";
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
  const isAuthPage = internalPathname.startsWith("/login");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  if (!token && !isAuthPage) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const rewrittenUrl = new URL(internalPathname, request.url);
  rewrittenUrl.search = request.nextUrl.search;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

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
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
