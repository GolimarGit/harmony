import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import TaskList from "@/components/tasks/task-list"

export default async function CompletedPage() {
  const supabase = createServerComponentClient({ cookies })

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
        <p className="text-gray-500">Tasks you've completed</p>
      </div>
      <TaskList initialTasks={tasks || []} />
    </div>
  )
}
