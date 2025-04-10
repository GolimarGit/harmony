import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = await Promise.resolve(req.cookies.get(name))
          return cookie?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          await Promise.resolve(
            res.cookies.set({
              name,
              value,
              ...options,
            }),
          )
        },
        async remove(name: string, options: CookieOptions) {
          await Promise.resolve(
            res.cookies.set({
              name,
              value: "",
              ...options,
            }),
          )
        },
      },
    },
  )

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is signed in and the current path is / redirect the user to /dashboard
  if (
    user &&
    (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // If user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
}
