"use client"

import { useState, useEffect } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { useToast } from "@/components/ui/use-toast"
import TaskItem from "@/components/tasks/task-item"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AddTaskDialog from "@/components/tasks/add-task-dialog"

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  due_date?: string
  priority?: number
  project_id?: string
  created_at: string
}

interface TaskListProps {
  initialTasks: Task[]
  filter?: {
    completed?: boolean
    due_date?: string
    project_id?: string
  }
}

export default function TaskList({ initialTasks, filter }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const { supabase } = useSupabase()
  const { toast } = useToast()

  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  useEffect(() => {
    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTasks((prev) => [payload.new as Task, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setTasks((prev) => prev.map((task) => (task.id === payload.new.id ? (payload.new as Task) : task)))
          } else if (payload.eventType === "DELETE") {
            setTasks((prev) => prev.filter((task) => task.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const toggleTaskCompletion = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase.from("tasks").update({ completed: !completed }).eq("id", id)

      if (error) throw error
    } catch (error: any) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Task deleted",
        description: "The task has been deleted successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="mb-2 text-lg font-medium">No tasks for today</h3>
          <p className="mb-4 text-sm text-gray-500">Add a new task to get started with your day.</p>
          <Button onClick={() => setIsAddTaskOpen(true)} className="bg-rose-500 hover:bg-rose-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggleComplete={toggleTaskCompletion} onDelete={deleteTask} />
          ))}
        </div>
      )}
      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  )
}
