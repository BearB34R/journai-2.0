import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access protected routes
  const url = req.nextUrl.pathname
  const protectedRoutes = ["/dashboard", "/journal", "/activities", "/profile"]

  if (!session && protectedRoutes.some((route) => url.startsWith(route))) {
    const redirectUrl = new URL("/auth/signin", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If session and trying to access auth routes
  const authRoutes = ["/auth/signin", "/auth/signup", "/auth/confirmation"]

  if (session && authRoutes.some((route) => url === route)) {
    const redirectUrl = new URL("/dashboard", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/journal/:path*", "/activities/:path*", "/profile/:path*", "/auth/:path*"],
}
