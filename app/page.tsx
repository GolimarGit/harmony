import { redirect } from "next/navigation"
import LandingPage from "@/components/landing-page"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function Home() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return <LandingPage />
}
