"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import EditTaskDialog from "@/components/tasks/edit-task-dialog"

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

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleToggleComplete = () => {
    onToggleComplete(task.id, task.completed)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id)
    }
  }

  const handleEdit = () => {
    setIsEditOpen(true)
  }

  const getPriorityColor = (priority?: number) => {
    switch (priority) {
      case 1:
        return "text-red-500"
      case 2:
        return "text-orange-500"
      case 3:
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border p-3 transition-colors",
        task.completed ? "bg-gray-50" : "bg-white",
      )}
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
          className={cn("h-5 w-5 rounded-full", task.completed && "bg-rose-500 text-primary-foreground")}
        />
        <div className="space-y-1">
          <p className={cn("font-medium", task.completed && "text-gray-400 line-through")}>{task.title}</p>
          {task.description && <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>}
          {task.due_date && (
            <div className="flex items-center text-xs">
              <Calendar className="mr-1 h-3 w-3 text-gray-500" />
              <span className={getPriorityColor(task.priority)}>{format(new Date(task.due_date), "MMM d, yyyy")}</span>
            </div>
          )}
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="text-red-500">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditTaskDialog open={isEditOpen} onOpenChange={setIsEditOpen} task={task} />
    </div>
  )
}
