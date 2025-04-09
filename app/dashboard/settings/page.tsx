import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UserSettingsForm from "@/components/settings/user-settings-form"

export default async function SettingsPage() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account settings</p>
      </div>
      <div className="max-w-2xl">
        <UserSettingsForm user={session.user} />
      </div>
    </div>
  )
}
