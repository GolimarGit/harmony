import { redirect } from "next/navigation"
import UserSettingsForm from "@/components/settings/user-settings-form"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account settings</p>
      </div>
      <div className="max-w-2xl">
        <UserSettingsForm user={user} />
      </div>
    </div>
  )
}
