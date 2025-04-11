"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calendar, CheckCircle2, ChevronDown, ChevronRight, Clock, Home, Inbox, Plus, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSupabase } from "@/components/supabase-provider"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [labelsOpen, setLabelsOpen] = useState(true)
  const { supabase } = useSupabase()
  const { toast } = useToast()

  const toggleProjects = () => {
    setProjectsOpen(!projectsOpen)
  }

  const toggleLabels = () => {
    setLabelsOpen(!labelsOpen)
  }

  const addProject = async () => {
    const projectName = prompt("Enter project name:")
    if (!projectName) return

    try {
      const { error } = await supabase.from("projects").insert([{ name: projectName }])

      if (error) throw error

      toast({
        title: "Project created",
        description: `${projectName} has been created successfully.`,
      })
    } catch (error: any) {
      toast({
        title: "Error creating project",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const addLabel = async () => {
    const labelName = prompt("Enter label name:")
    if (!labelName) return

    try {
      const { error } = await supabase.from("labels").insert([{ name: labelName }])

      if (error) throw error

      toast({
        title: "Label created",
        description: `${labelName} has been created successfully.`,
      })
    } catch (error: any) {
      toast({
        title: "Error creating label",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-background">
      <div className="flex h-16 items-center border-b border-border px-4">
        <Link href="/dashboard" className="flex items-center gap-2" prefetch={true}>
          <span className="text-xl font-bold text-rose-500">Harmony</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1">
          <Link href="/dashboard" prefetch={true}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard" && "bg-muted font-medium")}
            >
              <Home className="mr-2 h-4 w-4" />
              Today
            </Button>
          </Link>
          <Link href="/dashboard/inbox" prefetch={true}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/inbox" && "bg-muted font-medium")}
            >
              <Inbox className="mr-2 h-4 w-4" />
              Inbox
            </Button>
          </Link>
          <Link href="/dashboard/upcoming" prefetch={true}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/upcoming" && "bg-muted font-medium")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Upcoming
            </Button>
          </Link>
          <Link href="/dashboard/completed" prefetch={true}>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/completed" && "bg-muted font-medium")}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Completed
            </Button>
          </Link>
          <Link href="/dashboard/focus">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", pathname === "/dashboard/focus" && "bg-muted font-medium")}
            >
              <Clock className="mr-2 h-4 w-4" />
              Focus
            </Button>
          </Link>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={toggleProjects} className="w-full justify-start">
              {projectsOpen ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
              Projects
            </Button>
            <Button variant="ghost" size="icon" onClick={addProject} className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {projectsOpen && (
            <div className="ml-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                Personal
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Work
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Shopping
              </Button>
            </div>
          )}
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={toggleLabels} className="w-full justify-start">
              {labelsOpen ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
              Labels
            </Button>
            <Button variant="ghost" size="icon" onClick={addLabel} className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {labelsOpen && (
            <div className="ml-4 space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4 text-red-500" />
                Priority
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4 text-blue-500" />
                Work
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4 text-green-500" />
                Personal
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
