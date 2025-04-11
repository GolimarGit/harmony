import type React from "react"
import { redirect } from "next/navigation"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { PomodoroProvider } from "@/contexts/pomodoro-context"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader user={user} />
        <PomodoroProvider>
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </PomodoroProvider>
      </div>
    </div>
  )
}
