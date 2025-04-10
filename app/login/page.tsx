import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function LoginPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-gray-600">Sign in to your Harmony account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
