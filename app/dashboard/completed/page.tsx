import TaskList from "@/components/tasks/task-list"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function CompletedPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch completed tasks
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("completed", true)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Completed</h1>
        <p className="text-muted-foreground">Tasks you've completed</p>
      </div>
      <TaskList initialTasks={tasks || []} />
    </div>
  )
}
