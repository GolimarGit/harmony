"use client"

import type React from "react"

import { useState } from "react"
import { usePomodoro } from "@/contexts/pomodoro-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PomodoroSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PomodoroSettings({ open, onOpenChange }: PomodoroSettingsProps) {
  const { settings, updateSettings } = usePomodoro()

  // Convert seconds to minutes for the form
  const [workDuration, setWorkDuration] = useState(settings.workDuration / 60)
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration / 60)
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration / 60)
  const [longBreakInterval, setLongBreakInterval] = useState(settings.longBreakInterval)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Convert minutes back to seconds for the settings
    updateSettings({
      workDuration: workDuration * 60,
      shortBreakDuration: shortBreakDuration * 60,
      longBreakDuration: longBreakDuration * 60,
      longBreakInterval,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Pomodoro Settings</DialogTitle>
            <DialogDescription>Customize your Pomodoro timer durations and intervals.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="workDuration" className="text-right">
                Work
              </Label>
              <Input
                id="workDuration"
                type="number"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="col-span-2"
              />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shortBreakDuration" className="text-right">
                Short Break
              </Label>
              <Input
                id="shortBreakDuration"
                type="number"
                min="1"
                max="30"
                value={shortBreakDuration}
                onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                className="col-span-2"
              />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longBreakDuration" className="text-right">
                Long Break
              </Label>
              <Input
                id="longBreakDuration"
                type="number"
                min="1"
                max="60"
                value={longBreakDuration}
                onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                className="col-span-2"
              />
              <span className="text-sm text-gray-500">minutes</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longBreakInterval" className="text-right">
                Interval
              </Label>
              <Input
                id="longBreakInterval"
                type="number"
                min="1"
                max="10"
                value={longBreakInterval}
                onChange={(e) => setLongBreakInterval(Number(e.target.value))}
                className="col-span-2"
              />
              <span className="text-sm text-gray-500">pomodoros</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
