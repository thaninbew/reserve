import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

const protectedPaths = ["/dashboard", "/properties", "/settings"]; // extend as app grows

export default auth((req) => {
  const { nextUrl } = req;
  const isProtected = protectedPaths.some((path) =>
    nextUrl.pathname.startsWith(path),
  );

  if (!req.auth && isProtected) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return Response.redirect(loginUrl);
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
