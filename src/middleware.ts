import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the user is authenticated for protected routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("token")?.value || "";

    // If no token found, allow client-side auth check to handle redirection
    // This prevents server-side redirects that might cause token issues
    return NextResponse.next();
  }

  // Handle specific routes that need to be redirected
  if (
    pathname === "/banking/withdrawal-requests" ||
    pathname === "/banking/create-withdrawal"
  ) {
    // These are already correct paths, so let them pass through
    return NextResponse.next();
  }

  // Handle redirects for legacy paths if needed
  if (pathname === "/withdrawal-requests") {
    const redirectUrl = new URL("/banking/withdrawal-requests", request.url);
    console.log("Redirecting from", pathname, "to", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname === "/create-withdrawal") {
    const redirectUrl = new URL("/banking/create-withdrawal", request.url);
    console.log("Redirecting from", pathname, "to", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  // Default behavior for other routes
  return NextResponse.next();
}

// Only run the middleware on specific paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/banking/:path*",
    "/withdrawal-requests",
    "/create-withdrawal",
  ],
};
