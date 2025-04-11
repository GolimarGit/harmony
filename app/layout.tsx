import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/components/supabase-provider"
// import RoutePrefetcher from "@/components/route-prefetcher"
import { PomodoroProvider } from "@/contexts/pomodoro-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harmony - Your Todo App",
  description: "A Todoist-inspired todo list application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            {/* <RoutePrefetcher /> */}
            <PomodoroProvider>
              {children}
            </PomodoroProvider>
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'