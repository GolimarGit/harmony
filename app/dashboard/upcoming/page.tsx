import TaskList from "@/components/tasks/task-list"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function UpcomingPage() {
  const supabase = await createServerSupabaseClient()

  // Get today's date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Fetch upcoming tasks (tasks with due dates in the future)
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, description, completed, due_date, priority, project_id, created_at")
    .gt("due_date", today.toISOString().split("T")[0])
    .order("due_date", { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upcoming</h1>
        <p className="text-gray-500">Tasks with upcoming due dates</p>
      </div>
      <TaskList initialTasks={tasks || []} />
    </div>
  )
}
