import TaskList from "@/components/tasks/task-list"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export default async function InboxPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch tasks without a project
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .is("project_id", null)
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inbox</h1>
        <p className="text-muted-foreground">Tasks without a project</p>
      </div>
      <TaskList initialTasks={tasks || []} />
    </div>
  )
}
