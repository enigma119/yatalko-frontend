import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_KEY } from "@/lib/constants";

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/subjects",
  "/posts",
  "/documents",
  "/profile",
  "/leaderboard",
  "/notifications",
  "/settings",
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

// Routes that are always public
const publicRoutes = ["/", "/about", "/contact", "/verify-email"];

/**
 * Check if the path matches any of the routes
 */
function matchesRoute(path: string, routes: string[]): boolean {
  return routes.some((route) => {
    // Exact match
    if (path === route) return true;
    // Prefix match for nested routes (e.g., /subjects/1, /posts/create)
    if (path.startsWith(`${route}/`)) return true;
    return false;
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get access token from cookies
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const isAuthenticated = !!accessToken;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") // files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if route is protected
  const isProtectedRoute = matchesRoute(pathname, protectedRoutes);
  const isAuthRoute = matchesRoute(pathname, authRoutes);

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    // Add redirect parameter to return after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users from auth routes to dashboard
  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};
