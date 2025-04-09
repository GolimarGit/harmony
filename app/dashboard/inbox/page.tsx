import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import TaskList from "@/components/tasks/task-list"

export default async function InboxPage() {
  const supabase = createServerComponentClient({ cookies })

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
        <p className="text-gray-500">Tasks without a project</p>
      </div>
      <TaskList initialTasks={tasks || []} />
    </div>
  )
}
