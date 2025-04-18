import { redirect } from "next/navigation"
import SignUpForm from "@/components/auth/signup-form"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function SignUpPage() {
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
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-gray-600">Sign up for Harmony to get started</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}
