import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  // If the user is authenticated and trying to access the login page,
  // redirect them to the home page.
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If unauthenticated, bypass the login screen and go directly to Google OAuth.
    const signInUrl = new URL("/api/auth/signin/google", request.url);
    signInUrl.searchParams.set("callbackUrl", "/");
    return NextResponse.redirect(signInUrl);
  }

  // If the user is not authenticated and trying to access a protected page,
  // redirect them directly to Google OAuth and preserve their original destination.
  if (!token) {
    const signInUrl = new URL("/api/auth/signin/google", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Configure which routes to run the middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
