import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import TaskList from "@/components/tasks/task-list"

export default async function UpcomingPage() {
  const supabase = createServerComponentClient({ cookies })

  // Get today's date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Fetch upcoming tasks (tasks with due dates in the future)
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
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
