import TaskList from "@/components/tasks/task-list"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch today's tasks
  const today = new Date().toISOString().split("T")[0]

  // Use a more efficient query
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, description, completed, due_date, priority, project_id, created_at")
    .eq("due_date", today)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Today</h1>
        <p className="text-gray-500">Tasks due today</p>
      </div>
      <TaskList initialTasks={tasks || []} />
    </div>
  )
}
