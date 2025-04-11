import TaskList from "@/components/tasks/task-list"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch today's tasks
  const today = new Date().toISOString().split("T")[0]

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("due_date", today)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Today</h1>
        <p className="text-muted-foreground">Tasks due today</p>
      </div>
      <TaskList initialTasks={tasks || []} />
    </div>
  )
}
